var ERC721Mintable = artifacts.require("./ERC721Mintable.sol");

var Config = async function (accounts) {
    const owner = accounts[0];
    const erc721Mintable = await ERC721Mintable.new();

    return {
        owner: owner,
        erc721Mintable: erc721Mintable,
    };
};

module.exports = {
    Config: Config,
};
