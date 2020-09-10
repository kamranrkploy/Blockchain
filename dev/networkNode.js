const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Blockchain = require('./blockchain');
const uuid = require('uuid/v1');
const port = process.argv[2];
const rp = require('request-promise');


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
   const newTransaction = req.body;
   const blockIndex = Zypher.addTransactionToPendingTransactions(newTransaction);
   res.json({note:`Transaction will be added to block ${blockIndex}.`});
});

app.post('/transaction/broadcast' , function(req , res){
    const newTransaction = Zypher.createNewTransaction(req.body.amount ,req.body.Sender , req.body.receiver);
    Zypher.addTransactionToPendingTransactions(newTransaction);


    const requestPromises = [];
    Zypher.networkNodes.forEach(networkNodeUrl => {
        const requestOptions = {
            uri: networkNodeUrl + '/transaction',
            method : 'POST',
            body : newTransaction ,
            json : true
        };
        requestPromises.push(rp(requestOptions));
    });
    Promise.all(requestPromises)
    .then(data => {
        res.json({note : 'Transaction created and Broadcasted successfully'});
    });
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
   
//    Zypher.createNewTransaction(125 , "00" , nodeAddress);
   
   const newBlock = Zypher.createNewBlock(nonce , BlockHash , previousBlockHash);

   const requestPromises = [];
   Zypher.networkNodes.forEach(networkNodeUrl => {
       const requestOptions = {
           uri: networkNodeUrl + '/receive-new-block',
           method : 'POST',
           body:{newBlock : newBlock},
           json: true
       };
       requestPromises.push(rp(requestOptions));
   });

   Promise.all(requestPromises)
   .then( data => {
       const requestOptions = {
           uri: Zypher.currentNodeUrl + '/transaction/broadcast',
           method : 'POST',
           body : {
               amount: 50 ,
               Sender : "00",
               receiver : nodeAddress
           },
           json:true
       };
       return rp(requestOptions);
   }).then(data => {
    res.json({
        note : 'new block mined and broadcast successfully' ,
        block : newBlock
    });
   });
});

app.post('/receive-new-block' , function(req, res){
    const newBlock = req.body.newBlock;
    const lastBlock = Zypher.LastBlock();
    const correctHash = lastBlock.hash === newBlock.previousBlockHash;
    const correctIndex = lastBlock['index']+1 === newBlock['index'];

    if(correctHash && correctIndex){
        Zypher.chain.push(newBlock);
        Zypher.pendingTransaction = [];
        res.json({
            note:'new block received successfully',
            newBlock : newBlock
        });
    }else{
        res.json({
            note:'new block was rejected',
            newBlock : newBlock
        });
    }

});



app.post('/register-and-broadcast-node' , function(req , res){
     
       const newNodeUrl = req.body.newNodeUrl;
       if(Zypher.networkNodes.indexOf(newNodeUrl) == -1) Zypher.networkNodes.push(newNodeUrl);

       const regNodesPromises = [];
       Zypher.networkNodes.forEach(networkNodeUrl => {
           const requestOptions = {
               uri:networkNodeUrl + '/register-node',
               method: 'POST' ,
               body: { newNodeUrl : newNodeUrl},
               json:true
           };
           regNodesPromises.push(rp(requestOptions));
        });
        Promise.all(regNodesPromises)
        .then(data => {
            const bulkRegisterOptions = {
                uri : newNodeUrl + '/register-nodes-bulk',
                method : 'POST',
                body: { allNetworkNodes: [...Zypher.networkNodes , Zypher.currentNodeUrl]},
                json: true
            };
            return rp(bulkRegisterOptions);

        }).then( data => {
            res.json({note: 'New Node Registered with Network Successfully'});
        });
});

app.post('/register-node' , function(req , res){
    const newNodeUrl = req.body.newNodeUrl;
    const nodeNotPresentAlready = Zypher.networkNodes.indexOf(newNodeUrl) == -1;
    const notCurrentNode = Zypher.currentNodeUrl !== newNodeUrl;
    if(nodeNotPresentAlready && notCurrentNode) Zypher.networkNodes.push(newNodeUrl);
    res.json({note:'NEW NODE REGISTERED SUCCESSFULLY'});
    
})

app.post('/register-nodes-bulk' , function(req , res){
     const allNetworkNodes = req.body.allNetworkNodes;
     allNetworkNodes.forEach(networkNodeUrl => {
         const nodeNotPresentAlready = Zypher.networkNodes.indexOf(networkNodeUrl) == -1 ;
         const notCurrentNode = Zypher.currentNodeUrl !== networkNodeUrl;
         if(nodeNotPresentAlready && notCurrentNode) Zypher.networkNodes.push(networkNodeUrl);
     });
    res.json({note:'Bulk Registration done successfully'});
});

app.get('/consensus' , function(req , res) {
    const requestPromises = [];
    Zypher.networkNodes.forEach(networkNodeUrl => {
        const requestOptions = {
            uri:networkNodeUrl + '/blockchain',
            method:'GET',
            json:true
        };
            requestPromises.push(rp(requestOptions));
    });

    Promise.all(requestPromises)
    //the data here is nothing but array of blockchain
    .then(blockchains => {
        const currentChainLenght = Zypher.chain.length;
        let maxChainLength = currentChainLenght;
        let newLongestChain = null;
        let newPrendingTransactions = null ;
      
        blockchains.forEach(blockchain => {
            if(blockchain.chain.length > maxChainLength){
                maxChainLength = blockchain.chain.length;
                newLongestChain = blockchain.chain;
                newPrendingTransactions = blockchain.pendingTransaction;
            };
        });
            if(!newLongestChain || (newLongestChain && !Zypher.chainIsValid(newLongestChain))){
                res.json({
                    note : 'current chain has not been replaced',
                    chain : Zypher.chain
                });
            }
        //   else if (newLongestChain && Zypher.chainIsValid(newLongestChain))
          else{
             Zypher.chain = newLongestChain;
             Zypher.pendingTransaction = newPrendingTransactions;
             res.json({
                 note:'this chain has been replaced',
                 chain: Zypher.chain
             });
          }
    });
});

app.get('/block/:blockHash' , function(req , res){
   const blockHash = req.params.blockHash;
   const correctBlock = Zypher.getBlock(blockHash);
   res.json({
       block:correctBlock
   });
});

app.get('/transaction/:transactionId' , function(req , res){
     const transactionId = req.params.transactionId;
     const transactionData = Zypher.getTransaction(transactionId);
     res.json({
         transaction : transactionData.transaction,
         block: transactionData.block
     });
});

app.get('/address/:adrress' , function(req , res){

});


app.listen(port , function(){
    console.log(`listening on port: ${port}`);
});
