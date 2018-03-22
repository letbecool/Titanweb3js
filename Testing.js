var Web3 = require('web3')

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
console.log(" ................................this is for web3 provider");
console.log(web3);
var IoTContract = web3.eth.contract('[{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"currentholdingsof","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_vaultaddress","type":"address"}],"name":"IoT","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"sonaddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lawyeraddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"unlock","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owneraddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"vaultaddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"lock","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"","type":"uint256"}],"name":"TransferLog","type":"event"}]');

var myContractInstance = IoTContract.at('4304144ad7eb636792ccb9e6180fe1ed6c9b6b5f');
console.log(myContractInstance); 

///* 
console.log(".........now further is to deploy the contract......................all done..................................... ");



