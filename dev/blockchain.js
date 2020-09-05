const sha256 = require('sha256');
const currentNodeUrl = process.argv[3];
const uuid = require('uuid/v1');


function Blockchain(){
    this.chain = [];
    this.pendingTransaction = [];
    this.currentNodeUrl = currentNodeUrl; // it is simply getting the value of current node url from package.json
    this.networkNodes = [];

    //Genesis Block using dummy arbitrary data
     this.createNewBlock(233 , '0' , '0' );

}

 Blockchain.prototype.createNewBlock = function(nonce , previousBlockHash , hash){
      const newBlock = {
           index : this.chain.length + 1 ,
           timeStamp : Date.now() ,
           transaction : this.pendingTransaction ,
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
           amount : amount + ' Zypher',
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
          const previousBlock = blockchain[i-1];
          const blockHash = this.hashBlock((previousBlock['hash']) , { transaction: currentBlock['transaction']} , currentBlock['nonce']);
          if(blockHash.substring(0,4) !== '0000') validChain = false;
          if(currentBlock['previousBlockHash'] !== previousBlock['hash']) validChain = false;

     };

     const genesisBlock = blockchain[0];
     const correctNonce = genesisBlock['nonce'] === 233 ;
     const correctPreviousBlockHash = genesisBlock['previousBlockHash'] === '0';
     const correctHash = genesisBlock['hash'] === '0';
     const correctTransactions = genesisBlock['transaction'].length === 0;
      
     if(!correctNonce || !correctPreviousBlockHash || !correctHash || !correctTransactions) validChain = false;

     return validChain;
};


module.exports = Blockchain;