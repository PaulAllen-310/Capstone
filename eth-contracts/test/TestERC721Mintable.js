var Test = require("../config/testConfig.js");

contract("TestERC721Mintable", (accounts) => {
    var config;
    before("setup contract", async () => {
        config = await Test.Config(accounts);
    });

    describe("match erc721 spec", function () {
        it("should return total supply", async function () {});

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
