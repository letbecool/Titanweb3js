/*
this script expect all contracts to be in CONTRACTS_DIR directory

For some reason, the path given to findImports from solc does not include '../' and './' at the beginning of the imported paths.

import '../Ownable.sol' will be transformed to 'Ownable.sol' in findImports argument. So it is not possible to reference files in a backward relative relation.
*/
import fs from "fs";
import path from 'path';
import solc from 'solc';

//full contract path , here .sol file must be in _dirname/contracts folder
const CONTRACTS_DIR = path.resolve(__dirname, 'contracts');

//returns contract content from contract name inside the contract path
function findContract(pathName) {
    const contractPath = path.resolve(CONTRACTS_DIR, pathName);
    if (isContract(contractPath)) {
        return fs.readFileSync(contractPath, 'utf8');
    } else {
        throw new Error(`File ${contractPath} not found`);
    }
}

function isContract(path) {
    return fs.existsSync(path);
}

function findImports (pathName) {
    try {
        return { contents: findContract(pathName) };
    } catch(e) {
        return { error: e.message };
    }
}

const source = findContract('Contract.sol');


const compiled = solc.compile({
    sources: {
        'Contract' : source
    }
}, 1, findImports);