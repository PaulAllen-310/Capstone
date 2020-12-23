var Test = require("../config/testConfig.js");
var truffleAssert = require("truffle-assertions");

contract("SolnSquareVerifier", (accounts) => {
    var config;
    var json;

    before("setup contract", async () => {
        config = await Test.Config(accounts);
        json = require("../../zokrates/code/square/proof.json");
    });

    describe("Mint with solution", function () {
        // Test if a new solution can be added for contract - SolnSquareVerifier
        // Test if an ERC721 token can be minted for contract - SolnSquareVerifier
        it("Should verify using the correct proof", async function () {
            try {
                const tx = await config.solnSquareVerifier.mint(json.proof.a, json.proof.b, json.proof.c, json.inputs, config.transferTo, 1, { from: config.owner });
                truffleAssert.eventEmitted(tx, "Added");
                truffleAssert.eventEmitted(tx, "Transfer");
            } catch (e) {
                assert.fail("Could not present the solution and mint the token.");
            }
        });
    });
});
