

/**
 * Purchase asset plays with TitanToken.sol contract
*/

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
    var input = fs.readFile('TitanToken.sol', 'utf8');

    let compiledContract = solc.compile({sources: input}, 1);
    let abi = compiledContract.contracts['TitanToken.sol:TitanToken'].interface;
    let bytecode = '0x'+compiledContract.contracts['TitanToken.sol:TitanToken'].bytecode;
    let gasEstimate = web3.eth.estimateGas({data: bytecode});
    let TitanToken = web3.eth.contract(JSON.parse(abi));
 /*
    titantoken = TitanToken.new({
        from: web3.eth.account[0],
                        gas:300000
                        });
   */
  //place address in place of deploying again 
    //  function transfer(address _to, uint256 _value)
    function transfer(){

        var transfer = titantoken.transfer({
            from: web3.eth.account[0],
            gas:300000
            }, 
            _to,  // this is address of merchant so we can buy asset 
            _value  //this is amount of token sent to  _to address
        );
   
        //event for transfer successed
        transfer.watch(function(error,result){
            if(!error){
                console.log(result);
            }else{
        console.log(error);
            }
        });
    
    }
