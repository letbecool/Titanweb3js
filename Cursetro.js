

       var Web3 = require('web3')

       var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
         web3.eth.defaultAccount = web3.eth.accounts[0];

         var CoursetroContract = web3.eth.contract([
	{
		"constant": true,
		"inputs": [],
		"name": "getInstructor",
		"outputs": [
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_fName",
				"type": "string"
			},
			{
				"name": "_age",
				"type": "uint256"
			}
		],
		"name": "setInstructor",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
]);

var inp = "Datass"
var val = 123;
var Coursetro = CoursetroContract.at('0x692a70d2e424a56d2c6c27aa97d1a86395877b3a');
        console.log(Coursetro);

        Coursetro.setInstructor('Brutis', 44);
   //     Coursetro.getInstructor();

        var dataset = Coursetro.setInstructor(inp,val, { from: web3.eth.accounts[0], gas: 400000 });
   
        //console.log(data);
        console.log("setterdone");
       // console.log(Coursetro.getInstructor());



        Coursetro.getInstructor(function(error, result){
            if(!error)
                {
                   console.log("Not error");
                }
            else
                console.error(error);
        });

        


