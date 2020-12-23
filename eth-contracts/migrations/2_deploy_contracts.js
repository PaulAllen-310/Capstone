// migrating the appropriate contracts
var ERC721Mintable = artifacts.require("./ERC721Mintable.sol");
var Verifier = artifacts.require("./verifier.sol");
var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");

module.exports = function (deployer) {
    deployer.deploy(ERC721Mintable);
    deployer.deploy(Verifier);

    deployer.deploy(Verifier).then((instance) => {
        deployer.deploy(SolnSquareVerifier, Verifier.address);
    });
};
