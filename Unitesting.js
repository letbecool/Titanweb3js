var Web3 = require('web3')
var solc = require('solc')
var fs = require('fs')
 
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var code = fs.readFileSync('TitanToken.sol').toString()
var compiledCode = solc.compile(code)
 
var abiDefinition = JSON.parse(compiledCode.contracts[':TitanToken'].interface)
var Contract = web3.eth.contract(abiDefinition)
var byteCode = compiledCode.contracts[':TitanToken'].bytecode
 

//Input variables
//_to   this is address of merchant so we can buy asset 
// _value  this is amount of token sent to  _to address


//This address must be constant , It cannot be changed , This value is set after getting the address of the contract .
//const address = 'addressofcontract' ;


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
      
    const DeployedContractRef = Contract.at(address);
    //  function transfer(address _to, uint256 _value)
    var data = DeployedContractRef.transfer(_to,_value,{ from: web3.eth.accounts[0], gas: 400000 });
    console.log(data);
    DeployedContractRef.Transfer().watch(function(error, result) {
    console.log(result.args.result);
    })
}


