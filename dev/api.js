var express = require('express');
const port = 3010;
const bodyParser = require('body-parser');
const app = express();

//to use body parser library
//basically these two lines says if a request comes in with json data or with form data we simply wanna pass that data so that we can access it at any of the routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));



//sends back to us our entire blockchain
app.get('/blockchain' , function(req , res){
    
});

//for creating a new transaction for our blockchain
app.post('/transaction' , function(req , res){
    console.log(req.body);
    res.send(`the amount of transaction is ${req.body.amount} Zypher`);
});

//it ll going to mine  a new block for us
app.get('/mine' , function(req , res){
    
});



app.listen(port , () => {
    console.log(`listening on port: ${port}`);
});
