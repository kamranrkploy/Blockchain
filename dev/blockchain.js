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





  module.exports = Blockchain // so in case you are familiar with ES5 syntax of JS then use this. //though i recommend you to learn ES6. 