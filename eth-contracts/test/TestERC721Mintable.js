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

        it("should get token balance", async function () {
            let balance = await config.erc721Mintable.balanceOf(config.owner);
            assert.equal(balance, config.noOfTokensToMint, "The expected balance does not match.");
        });

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it("should return token uri", async function () {
            let testTokenId = 2;

            let tokenURI = await config.erc721Mintable.tokenURI(testTokenId);
            assert.equal(tokenURI, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/2", "The expected token URI does not match.");
        });

        it("should transfer token from one owner to another", async function () {
            let testTokenId = 10;

            await config.erc721Mintable.approve(config.transferTo, testTokenId, { from: config.owner });
            await config.erc721Mintable.transferFrom(config.owner, config.transferTo, testTokenId, { from: config.owner });

            let tokenOwner = await config.erc721Mintable.ownerOf(testTokenId);
            assert.equal(config.transferTo, tokenOwner, "The expected token owner does not match.");
        });
    });

    describe("have ownership properties", function () {
        it("should fail when minting when address is not contract owner", async function () {
            try {
                await config.erc721Mintable.mint(config.owner, 11, { from: transferTo });
                assert.fail("Caller should not be able to mint a new token if not the contract owner.");
            } catch (e) {}
        });

        it("should return contract owner", async function () {
            let contractOwner = await config.erc721Mintable.owner();
            assert.equal(config.owner, contractOwner, "The expected owner does not match.");
        });
    });
});
