const express = require('express');
const port = 3010;
const bodyParser = require('body-parser');
const app = express();
const Blockchain = require('./blockchain');

const Zypher = new Blockchain();

//to use body parser library
//basically these two lines says if a request comes in with json data or with form data we simply wanna pass that data so that we can access it at any of the routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));



//sends back to us our entire blockchain
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

//it ll going to mine  a new block for us
app.get('/mine' , function(req , res){
    
});



app.listen(port , () => {
    console.log(`listening on port: ${port}`);
});
