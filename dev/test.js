//i will be using ES6 and ES5 accordingly so i recommend you to learn ES6 if you haven't learnt it till now
//ES5
const Blockchain = require('./blockchain');
// import Blockchain from './blockchain'for using ES6 with nodejs install esm from your terminal or else go with the ES5 syntax


const MyCurrency = new Blockchain();

console.log(MyCurrency);

MyCurrency.createNewBlock(255 , 'vxhv8567ki9022' , 'asutnkd5454as4akaxnjsd');
MyCurrency.createNewBlock(666 , 'hahha8985S5ZXSA' , 'AASAS89SA5Z');
MyCurrency.createNewBlock(587 , '885647poiII' , 'OPkaisa9asjasasj');

console.log(MyCurrency);


