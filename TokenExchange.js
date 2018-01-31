

    //require file system. 
    //this enables us to read all file inside the folder where this current .js file belongs to
    // that means all .sol file and .js file must be in the same folder 
    const fs = require("fs");

    //require solc includes  compiler 
    const solc = require('solc');
    let Web3 = require('web3');
    let web3 = new Web3();
    web3.setProvider(new web3.providers.HttpProvider('https://rinkeby.infura.io/V6nTctDt9v9YiCZDAH24'));

    /**Reading AccessToken.sol from the file system
    */
    var input = fs.readFile('ExchangeToken.sol', 'utf8');
    
    let compiledContract = solc.compile({sources: input}, 1);
    //this abi will be constant through out . this is factory pattern .
    let abiexchange = compiledContract.contracts['ExchangeToken.sol:ExchangeToken'].interface;
    let bytecode = '0x'+compiledContract.contracts['ExchangeToken.sol:ExchangeToken'].bytecode;
    let gasEstimate = web3.eth.estimateGas({data: bytecode});
    let AccessToken = web3.eth.contract(JSON.parse(abi));




    
    //accesstoken  holds address of the TitanToken contract .
    //This  value come from which factory contract exactly is called 
    var accesstokenfrom;
    var accesstokento;
    //abi of contract TitanToken
    var abi;
    //this address can be get from the deployed contract.
    var exchangetokenaddress;
    var exchangetokenat = web3.eth.contract(abiexchange).at(exchangetokenaddress)
    var contractInstancefrom = web3.eth.contract(abi).at(accesstokenfrom); //in progess
    var contractInstanceto = web3.eth.contract(abi).at(accesstokento); // in progess
    
    //deploying the contract . empty @param
/*function deploy(){
    exchangetoken = ExchangeToken.new({
        from: web3.eth.account[0],
                        gas:300000
                        });
 }
*/
//the _value is passed from the _from address   
//It returns the exchanged value of the token .
//this value is then pass to _to address
function exchangeToken(){  
    var exchangefrom = contractInstancefrom.exchangeFrom({
            from: web3.eth.account[0],
            gas:300000
            },
            _value 
        );
        contractInstancefrom.watch(function(error,result){
            if(!error){
                console.log(result);
            }else{
        console.log(error);
            }
        });
    
    var exchangetoken = exchangetokenat.exchange({
                        from: web3.eth.account[0],
                        gas:300000
                        },
                        exchangefrom 
                    );
                    exchangetokenat.watch(function(error,result){
        if(!error){
            console.log(result);
        }else{
    console.log(error);
        }
    });

    var exchangeto = contractInstanceto.exchangeTo({
                from: web3.eth.account[0],
                gas:300000
                },
               exchangetoken
        );
        exchangeto.watch(function(error,result){
            if(!error){
                console.log(result);
            }else{
        console.log(error);
            }
        });
}
