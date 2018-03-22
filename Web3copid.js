const fs = require("fs");
const solc = require('solc')
let Web3 = require('web3');

let web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));

var input = {
  'AccessToken.sol': fs.readFileSync('AccessToken.sol', 'utf8')
};
let compiledContract = solc.compile({sources: input}, 1);
let abi = compiledContract.contracts['AccessToken.sol:AccessToken'].interface;
let bytecode = '0x'+compiledContract.contracts['AccessToken.sol:AccessToken'].bytecode;
let gasEstimate = web3.eth.estimateGas({data: bytecode});
let AccessTokenContract = web3.eth.contract(JSON.parse(abi));


var AccessToken = AccessTokenContract.new({
   from:web3.eth.coinbase,
   data:bytecode,
   gas: gasEstimate
 }, function(err, myContract){
    if(!err) {
       if(!myContract.address) {
           console.log(myContract.transactionHash) 
       } else {
           console.log(myContract.address) 
       }
    }
}); /*
var deployedContract = AccessTokenContract.new({ data: byteCode, from: web3.eth.accounts[0], gas: 4700000 }, (err, res) => {
    if (err) {
      //  console.log(err);
        return;
    }
 
    // Log the tx, you can explore status with eth.getTransaction()
  //  console.log(res.transactionHash);
 
    // If we have an address property, the contract was deployed
    if (res.address) {
    //    console.log('Contract address: ' + res.address);
        // Let's test the deployed contract
        contractFrom(res.address);
    }
}) 
*/