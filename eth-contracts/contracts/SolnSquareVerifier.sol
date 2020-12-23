pragma solidity >=0.4.21 <0.6.0;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "./ERC721Mintable.sol";
import "./IVerifier.sol";

// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is ERC721Mintable {
    using SafeMath for uint256;

    // TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
    IVerifier private verifier;

    constructor(address verifierAddress) public {
        verifier = IVerifier(verifierAddress);
    }

    // TODO define a solutions struct that can hold an index & an address
    struct Solution {
        uint256 index;
        address toAddress;
        bool added;
    }

    // TODO define an array of the above struct
    // TODO define a mapping to store unique solutions submitted
    mapping(bytes32 => Solution) private solutions;
    uint256 private numberOfSolutions;

    // TODO Create an event to emit when a solution is added
    event Added(address toAddress, uint256 tokenId);

    function getSolutionKey(
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c,
        uint256[2] memory input,
        address toAddress,
        uint256 tokenId
    ) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(a, b, c, input, toAddress, tokenId));
    }

    // TODO Create a function to add the solutions to the array and emit the event
    function storeSolution(
        bytes32 key,
        address toAddress,
        uint256 tokenId
    ) internal {
        numberOfSolutions = numberOfSolutions.add(1);
        solutions[key].index = numberOfSolutions;
        solutions[key].toAddress = toAddress;
        solutions[key].added = true;

        emit Added(toAddress, tokenId);
    }

    function mint(
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c,
        uint256[2] memory input,
        address toAddress,
        uint256 tokenId
    ) public returns (bool) {
        bytes32 key = getSolutionKey(a, b, c, input, toAddress, tokenId);

        //  - make sure the solution is unique (has not been used before)
        require(solutions[key].added == false);
        require(verifier.verifyTx(a, b, c, input));

        // TODO Create a function to mint new NFT only after the solution has been verified
        //  - make sure you handle metadata as well as tokenSuplly
        storeSolution(key, toAddress, tokenId);
        return super.mint(toAddress, tokenId);
    }
}
