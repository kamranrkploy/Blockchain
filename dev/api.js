var express = require('express');
const port = 3010;
var app = express();

//sends back to us our entire blockchain
app.get('/blockchain' , function(req , res){
    
});

//for creating a new transaction for our blockchain
app.post('/transaction' , function(req , res){
    
});

//it ll going to mine  a new block for us
app.get('/mine' , function(req , res){
    
});



app.listen(port , () => {
    console.log(`listening on port: ${port}`);
});
