//i will be using ES6 and ES5 accordingly so i recommend you to learn ES6 if you haven't learnt it till now
//ES5
const Blockchain = require('./blockchain');
// import Blockchain from './blockchain'for using ES6 with nodejs install esm from your terminal or else go with the ES5 syntax

const Zypher = new Blockchain(); //Zypher is just a name of my currency.

// console.log(Zypher);
//     Zypher.createNewBlock(11 , 'JSHADJKSA88565AS' , 'LISAKS98DAS');
//     Zypher.createNewTransaction(22 , 'AmaanHAIO9856aSDA' , 'HassanKAJAO65593JAIH')
//     Zypher.createNewBlock(121 , 'jsafajs8464dsa56' , 'hjksahj884dsa6a');
//     Zypher.createNewTransaction(24 , 'AmaanHAIO9856aSDA' , 'HassanKAJAO65593JAIH')
//     Zypher.createNewTransaction(26 , 'AmaanHAIO9856aSDA' , 'HassanKAJAO65593JAIH')
//     Zypher.createNewBlock(121 , 'SHAKLA554aAK' , 'AKDKLHAH8885aAD');

// console.log(Zypher.chain[1]);
// console.log(Zypher.chain[2]);
// console.log(Zypher);

// const nonce = 244 ;
// const previousBlockHash = 'JAJHA565656aADAada5cx28asa';
// const currentBlockData = [{
//     amount: 22 ,
//     sender : 'aAjkakAD5656fsC',
//     reciever : 'NCSCJAN8566aadac5fxks'
// },{
//     amount: 12 ,
//     sender : 'AKCAKL5535aada',
//     reciever : 'BDSU8646DABGzksaja'
// }
// ];

// console.log(Zypher.hashBlock(previousBlockHash , currentBlockData ,nonce));

// console.log(Zypher.proofOfWork(previousBlockHash , currentBlockData));
// console.log(Zypher.hashBlock(previousBlockHash ,currentBlockData ,66937));
const bc1 = {
    "chain": [
    {
    "index": 1,
    "timeStamp": 1599321391668,
    "transactions": [],
    "nonce": 100,
    "hash": "0",
    "previousBlockHash": "0"
    },
    {
    "index": 2,
    "timeStamp": 1599321400993,
    "transactions": [
    {
    "amount": 466,
    "Sender": "jkaklsjlkajaskljsalkjasas",
    "reciever": "KSLAJKLANKLNAJKLHsksakljslakhdklhsaifa",
    "transactionId": "6117cbe0ef9011ea98d035748dd2c281"
    }
    ],
    "nonce": 39237,
    "hash": "000039fa055bf1153aa4d92d57cfc4b55f10a577d1aec1989f0636c6a18413d6",
    "previousBlockHash": "0"
    },
    {
    "index": 3,
    "timeStamp": 1599321417195,
    "transactions": [
    {
    "amount": 50,
    "Sender": "00",
    "reciever": "5dd34f40ef9011ea98d035748dd2c281",
    "transactionId": "6364a210ef9011ea98d035748dd2c281"
    }
    ],
    "nonce": 27528,
    "hash": "00009618c91432792ac58ccb04a4257039f767befb757e618b5ee8ad8863ca51",
    "previousBlockHash": "000039fa055bf1153aa4d92d57cfc4b55f10a577d1aec1989f0636c6a18413d6"
    },
    {
    "index": 4,
    "timeStamp": 1599321457687,
    "transactions": [
    {
    "amount": 50,
    "Sender": "00",
    "reciever": "5dd34f40ef9011ea98d035748dd2c281",
    "transactionId": "6d0a92c0ef9011ea98d035748dd2c281"
    },
    {
    "amount": 46632,
    "Sender": "jkaklsjlkajasklssssjsalkjasas",
    "reciever": "KSLAJKLaasasasANKLNAJKLHsksakljslakhdklhsaifa",
    "transactionId": "79e23b60ef9011ea98d035748dd2c281"
    }
    ],
    "nonce": 37910,
    "hash": "0000986de6d85c9b5f4ce0558b56758b8d0e9785669f116d750b4039ddb203bd",
    "previousBlockHash": "00009618c91432792ac58ccb04a4257039f767befb757e618b5ee8ad8863ca51"
    }
    ],
    "pendingTransaction": [
    {
    "amount": 50,
    "Sender": "00",
    "reciever": "5dd34f40ef9011ea98d035748dd2c281",
    "transactionId": "852d2980ef9011ea98d035748dd2c281"
    }
    ],
    "currentNodeUrl": "http://localhost:3001",
    "networkNodes": []
    }
   console.log('Valid :' , Zypher.chainIsValid(bc1.chain));