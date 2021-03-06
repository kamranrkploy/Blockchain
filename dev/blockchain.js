const sha256 = require('sha256');
const currentNodeUrl = process.argv[3];
const uuid = require('uuid/v1');


function Blockchain(){
    this.chain = [];
    this.pendingTransaction = [];
    this.currentNodeUrl = currentNodeUrl; // it is simply getting the value of current node url from package.json
    this.networkNodes = [];

    //Genesis Block using dummy arbitrary data
     this.createNewBlock(100 , '0' , '0' );

}

 Blockchain.prototype.createNewBlock = function(nonce  , hash , previousBlockHash){
      const newBlock = {
           index : this.chain.length + 1 ,
           timeStamp : Date.now() ,
           transactions : this.pendingTransaction ,
           nonce : nonce , //this is just a proof of work that we created this whole new block in a legitimate way. it comes from proof of work and in our case it is just a number.
           hash : hash , // it is the data from our new block , we pass our transaction to hashing function.so all of our transaction will be compressed into a single string.
           previousBlockHash : previousBlockHash //it is also a hash but of a one block prior to the current block.
      };
         this.pendingTransaction = [];
         this.chain.push(newBlock);

         return newBlock;
 }

Blockchain.prototype.LastBlock = function(){
     return this.chain[this.chain.length - 1];
}

Blockchain.prototype.createNewTransaction = function(amount , Sender , reciever){
      const newTransaction = {
           amount : amount,
           Sender : Sender ,
           reciever : reciever,
           transactionId : uuid().split('-').join('')
      };

           return newTransaction;

}

Blockchain.prototype.addTransactionToPendingTransactions = function(transactionObject){
          this.pendingTransaction.push(transactionObject);
          return this.LastBlock()['index'] + 1; // returning index of the block to which above transaction is added to
}

Blockchain.prototype.hashBlock = function(previousBlockHash , currentBlockData , nonce)
    {
    
     const data_as_string = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
     const hash = sha256(data_as_string);
     return hash;

}

// i recommend you to study about what is proof of work for your better understanding.

Blockchain.prototype.proofOfWork = function(previousBlockHash , currentBlockData){
     let nonce = 0 ;
     let hash = this.hashBlock(previousBlockHash , currentBlockData , nonce) ;
     while(hash.substring(0,4) !== '0000'){
          nonce ++ ;
          hash = this.hashBlock(previousBlockHash , currentBlockData , nonce) ;
          // console.log(hash);   
     }
     //this is that nonce that gave us a valid hash or required hash.
     //so our nonce is pretty much our proof of work
     return nonce; 
}

Blockchain.prototype.chainIsValid = function(blockchain){
 
     let validChain = true;

     for(var i=1 ; i< blockchain.length ; i++){
          const currentBlock = blockchain[i];
          const prevBlock = blockchain[i - 1];
          const blockHash = this.hashBlock(prevBlock['hash'],{ transactions:currentBlock['transactions'] , index:currentBlock['index']} , currentBlock['nonce']);
          if(blockHash.substring(0, 4) !== '0000') validChain=false;
          if(currentBlock['previousBlockHash'] !== prevBlock['hash']) validChain=false;

     };

     const genesisBlock = blockchain[0];
     const correctNonce = genesisBlock['nonce'] === 100 ;
     const correctPreviousBlockHash = genesisBlock['previousBlockHash'] === '0';
     const correctHash = genesisBlock['hash'] === '0';
     const correctTransactions = genesisBlock['transactions'].length === 0;
      
     if(!correctNonce || !correctPreviousBlockHash || !correctHash || !correctTransactions)  validChain=false;

     return validChain;
};

Blockchain.prototype.getBlock = function(blockHash) {
     let correctBlock = null;    
     this.chain.forEach(block => {
          if (block.hash === blockHash) correctBlock = block;
     });
    return correctBlock;
}

Blockchain.prototype.getTransaction = function(transactionId) {
     let correctTransaction = null ;
     let correctBlock = null;

     this.chain.forEach(block => {
          block.transactions.forEach(transaction => {
         if(transaction.transactionId === transactionId){
               correctTransaction = transaction;
               correctBlock = block;
             };
          });
     });
    return {
         transaction: correctTransaction ,
         block: correctBlock
    };
};

Blockchain.prototype.getAdressData = function(address) {
     const addressTransactions = [];
     this.chain.forEach(block => {
        block.transactions.forEach(transaction => {
             if(transaction.Sender === address || transaction.reciever === address){
                  addressTransactions.push(transaction);
             };
        });
     });

     let balance = 0;
     addressTransactions.forEach(transaction => {
          if(transaction.reciever === address) balance += transaction.amount;
          else if(transaction.Sender === address) balance -= transaction.amount;


     });
     return {
          addressTransactions: addressTransactions ,
          addressBalance : balance
     };
};


module.exports = Blockchain;