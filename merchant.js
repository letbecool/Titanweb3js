var Web3 = require('web3')
var solc = require('solc')
var fs = require('fs')
 
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var code = fs.readFileSync('AccessToken.sol').toString()
var compiledCode = solc.compile(code)
 
var abiDefinition = JSON.parse(compiledCode.contracts[':AccessToken'].interface)
var Contract = web3.eth.contract(abiDefinition)
var byteCode = compiledCode.contracts[':AccessToken'].bytecode
 
//console.log(byteCode)
///* 
//input var  _assetkey  from bdb
//input var  account address <- web3.eth.accounts[0]
var _assetkey = '0xfffff'; 
var flag = false;
//This address must be constant , It cannot be changed , This value is set after getting the address of the contract .
const address = 'addressofcontract' ;


function deploy(){
    var deployedContract = Contract.new({ data: byteCode, from: web3.eth.accounts[0], gas: 4700000 }, (err, res) => {
        if (err) {
            console.log(err);
            return;
        }
        if (res.address) {
            
        console.log(res.address)
            
        }
    })
}


function contractFrom(address) {
      
    const DeployedContractRef = Contract.at(address);
    // function registerAsset(bytes32 _assetkey, bool _flag) public isAdmin(_assetkey) constant returns (bool){
    var data = DeployedContractRef.registerAsset(web3.fromAscii(_assetkey),flag,{ from: web3.eth.accounts[0], gas: 400000 });
    console.log(data);
    DeployedContractRef.RegisteredAsset().watch(function(error, result) {
    console.log(result.args.result);
    })
}
