Required installations

1) install node ---------> npm install node
2) install sha256 (a node module) ---------> npm i sha256
3) install postman application for ease of using API's
4) install nodemon ------------> npm install -g nodemon
5) install express library--------> npm i express --save
6) install body parser so that you can work in the postman app without any errors------> npm i body-parser --save
7)install uuid library for giving your node a unique node Address -----------> npm i uuid --save

WHAT YOU SHOULD KNOW , BEFORE DIVING IN HERE...

1) what is blockchain ?
2) what is genesis block ?
3) what is hash , how it is produced using hashing technique ?
4) what are blocks , nonce , hash in blockchain ?
5) what is proof of work , why is it necessary for any blockchain ?

Previous Knowledge

Good command on Javascript ES6  and ES5 , including its syntax , data structures etc.

Some Important Instructions
visit http://localhost:3010/blockchain to see the content of your Blockchain
visit http://localhost:3010/mine for mining new Blocks and to add all pending transactions to your blockchain
visit http://localhost:3010/transaction using postman (post method) and give some dummy data there to see the change t your blockchain at http://localhost:3010/blockchain.

Dummy Data for Postman : (in Body Select and Format as JSON)
{
    "amount" : 22 ,
    "sender" : "HSjsakla55s8aaw",
    "reciever" :  "jshadHAI9856A"
}