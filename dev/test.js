// run this command in the terminal: node dev/test.js

const Blockchain = require('./blockchain');
const coin = new Blockchain();

//copy and insert under sample chain
const bc1 = {
// "chain": [
// {
// "index": 1,
// "timestamp": 1593890890304,
// "transactions": [],
// "nonce": 100,
// "hash": "0",
// "previousBlockHash": "0"
// },
// {
// "index": 2,
// "timestamp": 1593891087400,
// "transactions": [],
// "nonce": 18140,
// "hash": "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100",
// "previousBlockHash": "0"
// },
// {
// "index": 3,
// "timestamp": 1593891103636,
// "transactions": [
// {
// "amount": 12.5,
// "sender": "00",
// "recipient": "422a0530be2c11eaa31d331b64e22744",
// "transactionId": "f44284e0be2c11eaa31d331b64e22744"
// }
// ],
// "nonce": 62445,
// "hash": "00000a9e26b6acdc1fc1e9e8cd15db32ec36cfcc40872ad26b0c373a5b225ffa",
// "previousBlockHash": "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100"
// },
// {
// "index": 4,
// "timestamp": 1593891503044,
// "transactions": [
// {
// "amount": 12.5,
// "sender": "00",
// "recipient": "422a0530be2c11eaa31d331b64e22744",
// "transactionId": "fdefc890be2c11eaa31d331b64e22744"
// }
// ],
// "nonce": 59341,
// "hash": "000006685c410536d21ab2817b81aad7792d117ddbf2aa98ad9a60bcead0d679",
// "previousBlockHash": "00000a9e26b6acdc1fc1e9e8cd15db32ec36cfcc40872ad26b0c373a5b225ffa"
// },
// {
// "index": 5,
// "timestamp": 1593891509123,
// "transactions": [
// {
// "amount": 12.5,
// "sender": "00",
// "recipient": "709123e0be2c11eaa7930f0f80936b57",
// "transactionId": "ec049330be2d11eaa7930f0f80936b57"
// }
// ],
// "nonce": 160214,
// "hash": "0000a959661790c8c666b105b8e9901511c59f06306c4c6f3707691b06b4c902",
// "previousBlockHash": "000006685c410536d21ab2817b81aad7792d117ddbf2aa98ad9a60bcead0d679"
// },
// {
// "index": 6,
// "timestamp": 1593891530248,
// "transactions": [
// {
// "amount": 12.5,
// "sender": "00",
// "recipient": "709123e0be2c11eaa7930f0f80936b57",
// "transactionId": "efa0ccc0be2d11eaa7930f0f80936b57"
// }
// ],
// "nonce": 28268,
// "hash": "00004f666261a4246897cc5f73d113960e5f29e2257e283c1574b1e21b45d09d",
// "previousBlockHash": "0000a959661790c8c666b105b8e9901511c59f06306c4c6f3707691b06b4c902"
// },
// {
// "index": 7,
// "timestamp": 1593891690335,
// "transactions": [
// {
// "amount": 12.5,
// "sender": "00",
// "recipient": "422a0530be2c11eaa31d331b64e22744",
// "transactionId": "fc37c2e0be2d11eaa31d331b64e22744"
// }
// ],
// "nonce": 40703,
// "hash": "0000ba9e2c6f7e71a318998769cc70f24f496bf6447afb037bba232009d15d4b",
// "previousBlockHash": "00004f666261a4246897cc5f73d113960e5f29e2257e283c1574b1e21b45d09d"
// },
// {
// "index": 8,
// "timestamp": 1593892078309,
// "transactions": [
// {
// "amount": 12.5,
// "sender": "00",
// "recipient": "51dda4a0be2c11ea9753b1bf0b5aea84",
// "transactionId": "5bac6820be2e11ea9753b1bf0b5aea84"
// },
// {
// "amount": 100,
// "sender": "ANSHHGFFDFFFDFSD7809N09N",
// "recipient": "N90HDGGSGSFDSHSDDDFJ775",
// "transactionId": "edd89a70be2e11ea9753b1bf0b5aea84"
// },
// {
// "amount": 200,
// "sender": "ANSHHGFFDFFFDFSD7809N09N",
// "recipient": "N90HDGGSGSFDSHSDDDFJ775",
// "transactionId": "fdbdf840be2e11ea831da1229e3363ee"
// },
// {
// "amount": 300,
// "sender": "ANSHHGFFDFFFDFSD7809N09N",
// "recipient": "N90HDGGSGSFDSHSDDDFJ775",
// "transactionId": "070d8b90be2f11eaa7930f0f80936b57"
// }
// ],
// "nonce": 24532,
// "hash": "0000b86619eba7a48ad8d4fcd000eef5c3656d3a238161b32a82a1852050191b",
// "previousBlockHash": "0000ba9e2c6f7e71a318998769cc70f24f496bf6447afb037bba232009d15d4b"
// },
// {
// "index": 9,
// "timestamp": 1593892127582,
// "transactions": [
// {
// "amount": 12.5,
// "sender": "00",
// "recipient": "60eec280be2c11eaba7515a9709dea3f",
// "transactionId": "42e97d40be2f11eaba7515a9709dea3f"
// }
// ],
// "nonce": 65449,
// "hash": "0000e10a7f0002ed7f9bff541cc243dc7ddd595dc487202cee265de3e47065cd",
// "previousBlockHash": "0000b86619eba7a48ad8d4fcd000eef5c3656d3a238161b32a82a1852050191b"
// },
// {
// "index": 10,
// "timestamp": 1593892226890,
// "transactions": [
// {
// "amount": 12.5,
// "sender": "00",
// "recipient": "60eec280be2c11eaba7515a9709dea3f",
// "transactionId": "6041d950be2f11eaba7515a9709dea3f"
// },
// {
// "amount": 300,
// "sender": "ANSHHGFFDFFFDFSD7809N09N",
// "recipient": "N90HDGGSGSFDSHSDDDFJ775",
// "transactionId": "7ad80820be2f11eaa7930f0f80936b57"
// },
// {
// "amount": 300,
// "sender": "ANSHHGFFDFFFDFSD7809N09N",
// "recipient": "N90HDGGSGSFDSHSDDDFJ775",
// "transactionId": "7b27fce0be2f11eaa7930f0f80936b57"
// },
// {
// "amount": 300,
// "sender": "ANSHHGFFDFFFDFSD7809N09N",
// "recipient": "N90HDGGSGSFDSHSDDDFJ775",
// "transactionId": "7b8251e0be2f11eaa7930f0f80936b57"
// },
// {
// "amount": 300,
// "sender": "ANSHHGFFDFFFDFSD7809N09N",
// "recipient": "N90HDGGSGSFDSHSDDDFJ775",
// "transactionId": "7bd4b7a0be2f11eaa7930f0f80936b57"
// },
// {
// "amount": 300,
// "sender": "ANSHHGFFDFFFDFSD7809N09N",
// "recipient": "N90HDGGSGSFDSHSDDDFJ775",
// "transactionId": "7c228980be2f11eaa7930f0f80936b57"
// },
// {
// "amount": 300,
// "sender": "ANSHHGFFDFFFDFSD7809N09N",
// "recipient": "N90HDGGSGSFDSHSDDDFJ775",
// "transactionId": "7c670c90be2f11eaa7930f0f80936b57"
// },
// {
// "amount": 300,
// "sender": "ANSHHGFFDFFFDFSD7809N09N",
// "recipient": "N90HDGGSGSFDSHSDDDFJ775",
// "transactionId": "7cacef30be2f11eaa7930f0f80936b57"
// },
// {
// "amount": 300,
// "sender": "ANSHHGFFDFFFDFSD7809N09N",
// "recipient": "N90HDGGSGSFDSHSDDDFJ775",
// "transactionId": "7ce87190be2f11eaa7930f0f80936b57"
// },
// {
// "amount": 300,
// "sender": "ANSHHGFFDFFFDFSD7809N09N",
// "recipient": "N90HDGGSGSFDSHSDDDFJ775",
// "transactionId": "7d221f30be2f11eaa7930f0f80936b57"
// },
// {
// "amount": 300,
// "sender": "ANSHHGFFDFFFDFSD7809N09N",
// "recipient": "N90HDGGSGSFDSHSDDDFJ775",
// "transactionId": "7d5eda10be2f11eaa7930f0f80936b57"
// },
// {
// "amount": 300,
// "sender": "ANSHHGFFDFFFDFSD7809N09N",
// "recipient": "N90HDGGSGSFDSHSDDDFJ775",
// "transactionId": "7d88f750be2f11eaa7930f0f80936b57"
// },
// {
// "amount": 300,
// "sender": "ANSHHGFFDFFFDFSD7809N09N",
// "recipient": "N90HDGGSGSFDSHSDDDFJ775",
// "transactionId": "7db892d0be2f11eaa7930f0f80936b57"
// },
// {
// "amount": 300,
// "sender": "ANSHHGFFDFFFDFSD7809N09N",
// "recipient": "N90HDGGSGSFDSHSDDDFJ775",
// "transactionId": "7dedac90be2f11eaa7930f0f80936b57"
// },
// {
// "amount": 300,
// "sender": "ANSHHGFFDFFFDFSD7809N09N",
// "recipient": "N90HDGGSGSFDSHSDDDFJ775",
// "transactionId": "7e87a2a0be2f11eaa7930f0f80936b57"
// },
// {
// "amount": 300,
// "sender": "ANSHHGFFDFFFDFSD7809N09N",
// "recipient": "N90HDGGSGSFDSHSDDDFJ775",
// "transactionId": "7f3595e0be2f11eaa7930f0f80936b57"
// }
// ],
// "nonce": 80375,
// "hash": "0000e2768ecd0b6d8f28a1f70ebf18b0a6d81188e9cfba8d966b5a160beb38e0",
// "previousBlockHash": "0000e10a7f0002ed7f9bff541cc243dc7ddd595dc487202cee265de3e47065cd"
// }
// ],
// "pendingTransactions": [
// {
// "amount": 12.5,
// "sender": "00",
// "recipient": "7ec72400be2c11ea831da1229e3363ee",
// "transactionId": "9b730c10be2f11ea831da1229e3363ee"
// }
// ],
// "currentNodeUrl": "http://localhost:3005",
// "networkNodes": []
};


console.log('VALID: ', coin.chainIsValid(bc1.chain));