var Web3 = require('web3')
var solc = require('solc')
var fs = require('fs')
 
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var code = fs.readFileSync('TitanToken.sol').toString()
var compiledCode = solc.compile(code)
var data;
var exchangevalue;
var abiDefinition = JSON.parse(compiledCode.contracts[':TitanToken'].interface)
var Contract = web3.eth.contract(abiDefinition)
var byteCode = compiledCode.contracts[':TitanToken'].bytecode
var address;
const factor = 10; //factor that token exchange
//input _value
//this function helps to switch between two tokens
function switchContractForFrom(symbol){


    switch (symbol){
        case 'R':
         address = '0xff';
       contractFrom(address);

        case 'A':
         address = '0xaf';
        contractFrom(address);

        }
}

function switchContractForTo(symbol){


    switch (symbol){
        case 'R':
         address = '0xff';
       contractTo(address);

        case 'A':
         address = '0xaf';
        contractTo(address);

        }
}




function contractFrom(address) {
      
    const DeployedContractRef = Contract.at(address);
    //  function transfer(address _to, uint256 _value)
     data = DeployedContractRef.exchangeFrom(_value,{ from: web3.eth.accounts[0], gas: 400000 });
    console.log(data);
    DeployedContractRef.Eventexchangefrom().watch(function(error, result) {
    console.log(result.args.result);
    })
    exchangevalue = DeployedContractRef.exchange(data,factor, { from: web3.eth.accounts[0], gas: 400000 });
    console.log(exchangevalue);
    
}

function contractTo(address) {
      
    const DeployedContractRef = Contract.at(address);
    //  function transfer(address _to, uint256 _value)
     DeployedContractRef.exchangeTo(data,{ from: web3.eth.accounts[0], gas: 400000 });
    console.log(data);
    DeployedContractRef.Eventexchangeto().watch(function(error, result) {
    console.log(result.args.result);
    })
       
}

