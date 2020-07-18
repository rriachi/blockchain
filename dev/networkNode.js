// Node Header
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain');
const uuid = require('uuid/v1');
const port = process.argv[2];
const rp = require('request-promise');
const nodeAddress = uuid().split('-').join('');
const coin = new Blockchain();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// get entire blockchain
// use 'http://localhost:3001/blockchain' in browser to hit this end point 
app.get('/blockchain', function (req, res) {
  res.send(coin);
});

// create a new transaction
// use postamn ,post ,raw, json, hit 'http://localhost:3001/transaction' end point 
// body:
// {
//     "amount": 100,
//     "sender": "ANSHHGFFDDDRDFFFDFSD7809N09N",
//     "recipient": "N90HDGGGDDGSGSFDSHSDDDFJ775"
// }
app.post('/transaction', function(req, res) {
	const newTransaction = req.body;
	const blockIndex = coin.addTransactionToPendingTransactions(newTransaction);
	res.json({ note: `Transaction will be added in block ${blockIndex}.` });
});

// broadcast a transaction
// use postman, post, raw, json, to hit this endpoint 'http://localhost:3004/transaction/broadcast'
// body:
// {
//     "amount": 30,
//     "sender": "ANSHHGFFDFFFDFSD7809N09N",
//     "recipient": "N90HDGGSGSFDSHSDDDFJ775"
// }
// 
app.post('/transaction/broadcast', function(req, res) {
	const newTransaction = coin.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient);
	coin.addTransactionToPendingTransactions(newTransaction);

	const requestPromises = [];
	coin.networkNodes.forEach(networkNodeUrl => {
		const requestOptions = {
			uri: networkNodeUrl + '/transaction',
			method: 'POST',
			body: newTransaction,
			json: true
		};

		requestPromises.push(rp(requestOptions));
	});

	Promise.all(requestPromises)
	.then(data => {
		res.json({ note: 'Transaction created and broadcast successfully.' });
	});
});

// mine a block
// use the browser to hit this endpoint : 'http://localhost:3001/mine'
app.get('/mine', function(req, res) {
	const lastBlock = coin.getLastBlock();
	const previousBlockHash = lastBlock['hash'];
	const currentBlockData = {
		transactions: coin.pendingTransactions,
		index: lastBlock['index'] + 1
	};
	const nonce = coin.proofOfWork(previousBlockHash, currentBlockData);
	const blockHash = coin.hashBlock(previousBlockHash, currentBlockData, nonce);
	const newBlock = coin.createNewBlock(nonce, previousBlockHash, blockHash);

	const requestPromises = [];
	coin.networkNodes.forEach(networkNodeUrl => {
		const requestOptions = {
			uri: networkNodeUrl + '/receive-new-block',
			method: 'POST',
			body: { newBlock: newBlock },
			json: true
		};

		requestPromises.push(rp(requestOptions));
	});
    // block reward 
	Promise.all(requestPromises)
	.then(data => {
		const requestOptions = {
			uri: coin.currentNodeUrl + '/transaction/broadcast',
			method: 'POST',
			body: {
				amount: 12.5,
				sender: "00",
				recipient: nodeAddress
			},
			json: true
		};

		return rp(requestOptions);
	})
	.then(data => {
		res.json({
			note: "New block mined & broadcast successfully",
			block: newBlock
		});
	});
});


// receive new block
app.post('/receive-new-block', function(req, res) {
	const newBlock = req.body.newBlock;
	const lastBlock = coin.getLastBlock();
	const correctHash = lastBlock.hash === newBlock.previousBlockHash; 
	const correctIndex = lastBlock['index'] + 1 === newBlock['index'];

	if (correctHash && correctIndex) {
		coin.chain.push(newBlock);
		coin.pendingTransactions = [];
		res.json({
			note: 'New block received and accepted.',
			newBlock: newBlock
		});
	} else {
		res.json({
			note: 'New block rejected.',
			newBlock: newBlock
		});
	}
});

// register a node and broadcast it to the network
// use postman, post, raw, json, to hit this endpoint, 'http://localhost:3001/register-and-broadcast-node'
// body:
// {
//     "newNodeUrl": "http://localhost:3002"
// }
app.post('/register-and-broadcast-node', function(req, res) {
	const newNodeUrl = req.body.newNodeUrl;
	if (coin.networkNodes.indexOf(newNodeUrl) == -1) coin.networkNodes.push(newNodeUrl);

	const regNodesPromises = [];
	coin.networkNodes.forEach(networkNodeUrl => {
		const requestOptions = {
			uri: networkNodeUrl + '/register-node',
			method: 'POST',
			body: { newNodeUrl: newNodeUrl },
			json: true
		};

		regNodesPromises.push(rp(requestOptions));
	});

	Promise.all(regNodesPromises)
	.then(data => {
		const bulkRegisterOptions = {
			uri: newNodeUrl + '/register-nodes-bulk',
			method: 'POST',
			body: { allNetworkNodes: [ ...coin.networkNodes, coin.currentNodeUrl ] },
			json: true
		};

		return rp(bulkRegisterOptions);
	})
	.then(data => {
		res.json({ note: 'New node registered with network successfully.' });
	});
});

// register a single node with the network ,
// use postman, json, raw, post 'http://localhost:3001/register-node'
// body: 
// {
//     "newNodeUrl": "http://localhost:3002"
// } 
app.post('/register-node', function(req, res) {
	const newNodeUrl = req.body.newNodeUrl;
	const nodeNotAlreadyPresent = coin.networkNodes.indexOf(newNodeUrl) == -1;
	const notCurrentNode = coin.currentNodeUrl !== newNodeUrl;
	if (nodeNotAlreadyPresent && notCurrentNode) coin.networkNodes.push(newNodeUrl);
	res.json({ note: 'New node registered successfully.' });
});


// register multiple nodes at once
// use postman , post , raw, json 'http://localhost:3002/register-nodes-bulk'
// body:
// {
//     "allNetworkNodes": [
//         "http://localhost:3001",
//         "http://localhost:3003",
//         "http://localhost:3004",
//         "http://localhost:3005"
//     ]
// }
app.post('/register-nodes-bulk', function(req, res) {
	const allNetworkNodes = req.body.allNetworkNodes;
	allNetworkNodes.forEach(networkNodeUrl => {
		const nodeNotAlreadyPresent = coin.networkNodes.indexOf(networkNodeUrl) == -1;
		const notCurrentNode = coin.currentNodeUrl !== networkNodeUrl;
		if (nodeNotAlreadyPresent && notCurrentNode) coin.networkNodes.push(networkNodeUrl);
	});

	res.json({ note: 'Bulk registration successful.' });
});


// consensus , test by joining a new node , add some transactions and test before you join 
// run http://localhost:3006/consenseus, check result node on top    
// then join the node and run again if not the longest should result in replacing the chain
app.get('/consensus', function(req, res) {
	const requestPromises = [];
	coin.networkNodes.forEach(networkNodeUrl => {
		const requestOptions = {
			uri: networkNodeUrl + '/blockchain',
			method: 'GET',
			json: true
		};

		requestPromises.push(rp(requestOptions));
	});

	Promise.all(requestPromises)
	.then(blockchains => {
		const currentChainLength = coin.chain.length;
		let maxChainLength = currentChainLength;
		let newLongestChain = null;
		let newPendingTransactions = null;

		blockchains.forEach(blockchain => {
			if (blockchain.chain.length > maxChainLength) {
				maxChainLength = blockchain.chain.length;
				newLongestChain = blockchain.chain;
				newPendingTransactions = blockchain.pendingTransactions;
			};
		});


		if (!newLongestChain || (newLongestChain && !coin.chainIsValid(newLongestChain))) {
			res.json({
				note: 'Current chain has not been replaced.',
				chain: coin.chain
			});
		}
		else {
			coin.chain = newLongestChain;
			coin.pendingTransactions = newPendingTransactions;
			res.json({
				note: 'This chain has been replaced.',
				chain: coin.chain
			});
		}
	});
});


// get block by blockHash
// you can hit this endpoint from the browser using:
// http://localhost:3001/block/00007e23f415ae324a20f228f5605b8dfe663d25097983c749bb917934857579 'pick any block hash' 
app.get('/block/:blockHash', function(req, res) { 
	const blockHash = req.params.blockHash;
	const correctBlock = coin.getBlock(blockHash);
	res.json({
		block: correctBlock
	});
});


// get transaction by transactionId / block
// you can hit this endpoint from the browser using:
// http://localhost:3001/transaction/7562bba0be9911ea96878f7c1da6a43c 'pick any transaction ID'
app.get('/transaction/:transactionId', function(req, res) {
	const transactionId = req.params.transactionId;
	const trasactionData = coin.getTransaction(transactionId);
	res.json({
		transaction: trasactionData.transaction,
		block: trasactionData.block
	});
});


// get address by address
// you can hit this endpoint from the browser using any address or the mining node address:
// http://localhost:3001/address/daac1360be9b11ea873d99a3c4aa02a5 'mining node address example'
app.get('/address/:address', function(req, res) {
	const address = req.params.address;
	const addressData = coin.getAddressData(address);
	res.json({
		addressData: addressData
	});
});

// explorer endpoint using sendFile
// hit this endpoint using : 'http://localhost:3001/block-explorer'  
app.get('/block-explorer', function(req, res) {
	res.sendFile('./block-explorer/index.html', { root: __dirname });
});


// port monitor [Check the listed nodes and ports in package.json file add / remove as yopu wish]
// to run this project on multiple computers make sure they are on the same network and use IP 
// http://123.432.34:3001
app.listen(port, function() {
	console.log(`Listening on port ${port}...`);
});

// missing a UTXO [unspent outpout system for the tokensand balances]  