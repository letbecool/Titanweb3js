 //require file system. 
    //this enables us to read all file inside the folder where this current .js file belongs to
    // that means all .sol file and .js file must be in the same folder 
    const fs = require("fs");

    //require solc includes  compiler 
    const solc = require('solc');
    let Web3 = require('web3');
    let web3 = new Web3();
    web3.setProvider(new web3.providers.HttpProvider('https://rinkeby.infura.io/V6nTctDt9v9YiCZDAH24'));

    /**Reading SuperTitan.sol from the file system
    */
    var input = fs.readFile('SuperTitan.sol', 'utf8');

    let compiledContract = solc.compile({sources: input}, 1);
    let abi = compiledContract.contracts['SuperTitan.sol:SuperTitan'].interface;
    let bytecode = '0x'+compiledContract.contracts['SuperTitan.sol:SuperTitan'].bytecode;
    let gasEstimate = web3.eth.estimateGas({data: bytecode});
    let SuperTitan = web3.eth.contract(JSON.parse(abi));

    var supertitanadd;
    //deploying the contract . empty @param
function deploy(){
    supertitan = SuperTitan.new({
        from: web3.eth.account[0],
                        gas:300000
                        });
 }
    
 // function newToken(uint256 _initialSupply, bytes32 _name, bytes32 symbol)returns(address _contractaddress, bytes32 name_of_token)
function newToken(){
    var newtoken = supertitanadd.newToken({
                        from: web3.eth.account[0],
                        gas:300000
                        }, 
                        _initialsupply, 
                        _name,
                        symbol 
                    );

    //event RegisteredAsset(address, bytes32, bool);

    supertitanadd.watch(function(error,result){
        if(!error){
            console.log(result);
        }else{
    console.log(error);
        }
    });
}