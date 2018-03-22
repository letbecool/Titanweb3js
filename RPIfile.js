var Gpio = require('onoff').Gpio

// Interaction with Ethereum
var Web3 = require('web3')
var web3 = new Web3()

// connect to the local node
web3.setProvider(new web3.providers.HttpProvider('http://localhost:8042'))

// The contract that we are going to interact with
var contractAddress = '0xe1d76d2bffc600333248343f7a1d144edaef29a2'

// Define the ABI (Application Binary Interface)
var ABI = JSON.parse('[{"constant":false,"inputs":[{"name":"recipient","type":"address"},{"name":"value","type":"uint256"}],"name":"depositToken","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"recipient","type":"address"}],"name":"getTokens","outputs":[{"name":"value","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"recipient","type":"address"},{"name":"value","type":"uint256"}],"name":"withdrawToken","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"status","type":"uint256"}],"name":"OnStatusChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"OnValueChanged","type":"event"}]')

// contract object
var contract = web3.eth.contract(ABI).at(contractAddress)

// components connected to the RPi
var greenLed = new Gpio(14, 'out')
var redLed = new Gpio(15, 'out')
var button = new Gpio(18, 'in', 'rising')



// display initial state
showStatus()



// watch event on the button
button.watch(function (err, value) {
 if (err) {
 throw err
 }

showStatus()
})



// wait for an event triggered on the Smart Contract
var onValueChanged = contract.OnValueChanged({_from: web3.eth.coinbase});

onValueChanged.watch(function(error, result) {
 if (!error) {
 showStatus()
 }
})



// power the LED according the value of the token
function showStatus() {
 
 // retrieve the value of the token
 var token = contract.getTokens(web3.eth.coinbase)

// display the LED according the value of the token
 if (token > 0) {
 // Green: you have enough token
 redLed.writeSync(0)
 greenLed.writeSync(1)
 } else {
 // Red: not enough token
 greenLed.writeSync(0)
 redLed.writeSync(1)
 }

}



// release process
process.on('SIGINT', function () {
 greenLed.unexport()
 redLed.unexport()
 button.unexport()
})