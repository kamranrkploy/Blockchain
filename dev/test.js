//i will be using ES6 and ES5 accordingly so i recommend you to learn ES6 if you haven't learnt it till now
//ES5
const Blockchain = require('./blockchain');
// import Blockchain from './blockchain'for using ES6 with nodejs install esm from your terminal or else go with the ES5 syntax


const Zypher = new Blockchain(); //Zypher is just a name of my currency.

Zypher.createNewBlock(11 , 'JSHADJKSA88565AS' , 'LISAKS98DAS');
Zypher.createNewTransaction(22 , 'AmaanHAIO9856aSDA' , 'HassanKAJAO65593JAIH')
Zypher.createNewBlock(121 , 'jsafajs8464dsa56' , 'hjksahj884dsa6a');
Zypher.createNewTransaction(24 , 'AmaanHAIO9856aSDA' , 'HassanKAJAO65593JAIH')
Zypher.createNewTransaction(26 , 'AmaanHAIO9856aSDA' , 'HassanKAJAO65593JAIH')
Zypher.createNewBlock(121 , 'SHAKLA554aAK' , 'AKDKLHAH8885aAD');

// console.log(Zypher.chain[1]);
// console.log(Zypher.chain[2]);
// console.log(Zypher);

// const nonce = 244 ;
const previousBlockHash = 'JAJHA565656aADAada5cx28asa';
const currentBlockData = [{
    amount: 22 ,
    sender : 'aAjkakAD5656fsC',
    reciever : 'NCSCJAN8566aadac5fxks'
},{
    amount: 12 ,
    sender : 'AKCAKL5535aada',
    reciever : 'BDSU8646DABGzksaja'
}
];

// console.log(Zypher.hashBlock(previousBlockHash , currentBlockData ,nonce));

console.log(Zypher.proofOfWork(previousBlockHash , currentBlockData));
console.log(Zypher.hashBlock(previousBlockHash ,currentBlockData ,66937));
