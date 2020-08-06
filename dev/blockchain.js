function Blockchain(){
    this.chain = [];
    this.newTransaction = [];
}

 Blockchain.prototype.createNewBlock = function(nonce , hash , previousBlockHash){
      const newBlock = {
           index : this.chain.length + 1 ,
           timeStamp : Date.now() ,
           transaction : this.newTransaction ,
           nonce : nonce , //this is just a proof of work that we created this whole new block in a legitimate way. it comes from proof of work and in our case it is just a number.
           hash : hash , // it is the data from our new block , we pass our transaction to hashing function.so all of our transaction will be compressed into a single string.
           previousBlockHash : previousBlockHash //it is also a hash but of a one block prior to the current block.
      };
         this.newTransaction = [];
         this.chain.push(newBlock);

         return newBlock;
 }

Blockchain.prototype.LastBlock = function(){
     return this.chain[this.chain.length - 1];
}



module.exports = Blockchain;