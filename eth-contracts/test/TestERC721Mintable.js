var Test = require("../config/testConfig.js");

contract("TestERC721Mintable", (accounts) => {
    var config;

    before("setup contract", async () => {
        config = await Test.Config(accounts);

        // setup the minted tokens
        for (let i = 1; i <= config.noOfTokensToMint; i++) {
            config.erc721Mintable.mint(config.owner, i, { from: config.owner });
        }
    });

    describe("match erc721 spec", function () {
        it("should return total supply", async function () {
            let totalSupply = await config.erc721Mintable.totalSupply();
            assert.equal(totalSupply, config.noOfTokensToMint, "The expected total number of minted tokens does not match.");
        });

        it("should get token balance", async function () {});

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it("should return token uri", async function () {});

        it("should transfer token from one owner to another", async function () {});
    });

    describe("have ownership properties", function () {
        it("should fail when minting when address is not contract owner", async function () {});

        it("should return contract owner", async function () {});
    });
});
