var Web3 = require('web3')
var solc = require('solc')
var fs = require('fs')
 
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var code = fs.readFileSync('SuperTitan.sol').toString()
var compiledCode = solc.compile(code)
var abiDefinition = JSON.parse(compiledCode.contracts[':SuperTitan'].interface)
var Contract = web3.eth.contract(abiDefinition)
var byteCode = compiledCode.contracts[':SuperTitan'].bytecode
//var _to = "0xff";
//var _value = 10;

//Input variables
var _initialSupply = 100;
var _name = 'name';
var symbol = 'N';


//This address must be constant , It cannot be changed , This value is set after getting the address of the contract .
//const address = 'addressofcontract' ;
deploy();

function deploy(){

    var deployedContract = Contract.new({ data: byteCode, from: web3.eth.accounts[0], gas: 4700000 }, (err, res) => {
        if (err) {
            console.log(err);
            return;
        }
        if (res.address) {
            
        console.log(res.address);
        contractFrom(res.address); 
        }
    })
}



function contractFrom(address) {
      //    function newToken(uint256 _initialSupply, bytes32 _name, bytes32 symbol) 
    const DeployedContractRef = Contract.at(address);
   
    var data = DeployedContractRef.newToken(_initialSupply, _name, symbol, { from: web3.eth.accounts[0], gas: 40000000 });
    console.log(data);
    DeployedContractRef.TokenAddedToTitan().watch(function(error, result) {
    console.log(result.args.result);
    })
}

