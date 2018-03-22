var Web3 = require('web3')
var solc = require('solc')
console.log(solc);
var fs = require('fs')
console.log(fs);
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
console.log(" ................................this is for web3 provider");
console.log(web3);
var code = fs.readFileSync('AccessToken.sol').toString()
var compiledCode = solc.compile(code)
 
var abiDefinition = JSON.parse(compiledCode.contracts[':AccessToken'].interface);
console.log("all done..................................... ");
console.log(abiDefinition);



var AccessTokenContract = web3.eth.contract(abiDefinition);
console.log("...............................all done..................................... ");
console.log(AccessTokenContract);
var byteCode = compiledCode.contracts[':AccessToken'].bytecode
 
console.log(byteCode)
///* 
console.log(".........now further is to deploy the contract......................all done..................................... ");
var _assetkey = '0xfffff'; 
var flag = false;


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
//*/
//var address = ' 0x7f9ddac8ad8fde7611e7a74b8cfba9a97345bd36';
function contractFrom(address) {
    
    
    // Reference to the deployed contract
    const DeployedContractRef = AccessTokenContract.at(address);
    // function registerAsset(bytes32 _assetkey, bool _flag) public isAdmin(_assetkey)  returns (bool){
    var data = DeployedContractRef.registerAsset(web3.fromAscii(_assetkey),flag,{ from: web3.eth.accounts[0], gas: 400000 });
    console.log(data);
   // console.log(data[2]);

   DeployedContractRef.RegisteredAsset().watch(function(error, result) {

   console.log(result.args.result);
    //console.log(web3.toAscii(result.args.result[1]));
    //console.log(result.args.result[2]);
//});
    })
}
