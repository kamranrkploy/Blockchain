const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Blockchain = require('./blockchain');
const uuid = require('uuid/v1');
const port = process.argv[2];


const nodeAddress = uuid().split('-').join('');


const Zypher = new Blockchain();

//to use body parser library
//basically these two lines says if a request comes in with json data or with form data we simply wanna pass that data so that we can access it at any of the routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));



//sends back to us our entire blockchain ; go to localhost:3010/blockchain to see our blockchain
app.get('/blockchain' , function(req , res){
    res.send(Zypher);
});



//for creating a new transaction for our blockchain
//create dummy data in postman , chose post and enter localhost:3010/transaction
//select body , raw and select the format as json
//now place your dummy data here , in the form of json object
app.post('/transaction' , function(req , res){
   const blockIndex = Zypher.createNewTransaction(req.body.amount , req.body.sender , req.body.reciever);
   res.json({ note: `The transaction will be added to block ${blockIndex}`});
});




//it ll going to mine  a new block for us : go to localhost:3010/mine for mining
app.get('/mine' , function(req , res){
   const lastBlock = Zypher.LastBlock();
   const previousBlockHash = lastBlock['hash'];
   const currentBlockData = {
       transactions : Zypher.pendingTransaction ,
       index: lastBlock['index'] + 1
   };
   const nonce = Zypher.proofOfWork(previousBlockHash , currentBlockData);
   const BlockHash = Zypher.hashBlock(previousBlockHash , currentBlockData , nonce);
   
   Zypher.createNewTransaction(125 , "00" , nodeAddress);
   
   const newblock = Zypher.createNewBlock(nonce , BlockHash , previousBlockHash);

    res.json({
        note : "new block mined successfully" ,
        block : newblock
    });
});






app.listen(port , function(){
    console.log(`listening on port: ${port}`);
});
