

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
    var input = fs.readFile('AccessToken.sol', 'utf8');

    let compiledContract = solc.compile({sources: input}, 1);
    let abi = compiledContract.contracts['AccessToken.sol:AccessToken'].interface;
    let bytecode = '0x'+compiledContract.contracts['AccessToken.sol:AccessToken'].bytecode;
    let gasEstimate = web3.eth.estimateGas({data: bytecode});
    let AccessToken = web3.eth.contract(JSON.parse(abi));

    var AssetKey = "0x1ff"; // this value come from bigchaindb
    var flag;
    var accesstoken;
    //deploying the contract . empty @param

    accesstoken = AccessToken.new({
        from: web3.eth.account[0],
                        gas:300000
                        });

    //function registerAsset(bytes32 _assetkey, bool _flag) public isAdmin(_assetkey)  returns (bool)
function RegisteredAsset(){
    var registerasset = accesstoken.registerAsset({
                        from: web3.eth.account[0],
                        gas:300000
                        }, 
                        AssetKey, 
                        flag = false 
                    );

    //event RegisteredAsset(address, bytes32, bool);

    registerasset.watch(function(error,result){
        if(!error){
            console.log(result);
        }else{
    console.log(error);
        }
    });
}