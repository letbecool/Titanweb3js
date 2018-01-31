/*This is one of the good example for one contract is interact
 * with number of deployed contract.
*/


//require file system. 
//this enables us to read all file inside the folder where this current .js file belongs to
// that means all .sol file and .js file must be in the same folder 
const fs = require("fs");

//require solc includes  compiler 
const solc = require('solc')


let Web3 = require('web3');

let web3 = new Web3();

web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));

/**syncronous file reading .
*/
var input = {
    'strings.sol': fs.readFileSync('strings.sol', 'utf8'),
    'StringLib.sol': fs.readFileSync('StringLib.sol', 'utf8'),
    'Killable.sol': fs.readFileSync('Killable.sol', 'utf8'),
    'Ownable.sol': fs.readFileSync('Ownable.sol', 'utf8'),
    'LMS.sol': fs.readFileSync('LMS.sol', 'utf8')
};

let compiledContract = solc.compile({sources: input}, 1);
let abi = compiledContract.contracts['LMS.sol:LMS'].interface;
let bytecode = '0x'+compiledContract.contracts['LMS.sol:LMS'].bytecode;
let gasEstimate = web3.eth.estimateGas({data: bytecode});

let LMS = web3.eth.contract(JSON.parse(abi));


//passing constructor parameter to LMS contract. to do that we have to pass address of the contract deployer. 
var lms = LMS.new("sanchit", "s@a.com", {
   //the value is derived from text box in UI. 
   //from:address_from_Wallet
    from:web3.eth.coinbase,
   data:bytecode,
   gas: gasEstimate
 }, function(err, myContract){ // this is fall back function do action on the condition whether above execution successed or not .
    if(!err) {
       if(!myContract.address) {
           console.log(myContract.transactionHash) 
       } else {
           console.log(myContract.address) 
       }
    }
  });