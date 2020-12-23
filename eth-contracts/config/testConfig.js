var ERC721Mintable = artifacts.require("./ERC721Mintable.sol");
var Verifier = artifacts.require("./verifier.sol");

var Config = async function (accounts) {
    const owner = accounts[0];
    const erc721Mintable = await ERC721Mintable.new();
    const verifier = await Verifier.new();

    return {
        erc721Mintable: erc721Mintable,
        verifier: verifier,
        owner: owner,
        noOfTokensToMint: 10,
        transferTo: accounts[1],
    };
};

module.exports = {
    Config: Config,
};
