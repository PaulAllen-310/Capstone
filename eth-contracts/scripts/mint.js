const HDWallet = require("truffle-hdwallet-provider");
const web3 = require("web3");
const NUM_TOKENS = 10;

const ERCMINTABLE721_ABI = [
    {
        constant: false,
        inputs: [
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "mint",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
];

async function main() {
    const provider = new HDWallet("dc4fa8ccd991ca33f17191b87a99f2142bdc2cc986f1de8b71720c8f0098ee0b", "https://rinkeby.infura.io/v3/29621bc133f3401e91e08ec6ef289318");
    const web3Instance = new web3(provider);

    const contract = new web3Instance.eth.Contract(ERCMINTABLE721_ABI, "0x6E95eadD51580882114cd0b82699be50b439C500", { gasLimit: "1000000" });

    for (var i = 0; i < NUM_TOKENS; i++) {
        const result = await contract.methods.mint("0x127b1291C1120dB198633dDc2dC61Ce75e096224", i).send({ from: "0x127b1291C1120dB198633dDc2dC61Ce75e096224" });
        console.log("Minted token. Transaction: " + result.transactionHash);
    }
}

main();
