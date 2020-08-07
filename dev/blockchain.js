const sha256 = require('sha256');

function Blockchain(){
    this.chain = [];
    this.pendingTransaction = [];
}

 Blockchain.prototype.createNewBlock = function(nonce , hash , previousBlockHash){
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
           reciever : reciever
      };
    
      this.pendingTransaction.push(newTransaction);
      return this.LastBlock()['index']+1;

}

Blockchain.prototype.hashBlock = function(previousBlockHash , currentBlockData , nonce){
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


















module.exports = Blockchain;