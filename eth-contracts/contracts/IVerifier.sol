// SPDX-License-Identifier: MIT
pragma solidity ^0.5.15;

interface IVerifier {
    function verifyTx(
        uint256[2] calldata a,
        uint256[2][2] calldata b,
        uint256[2] calldata c,
        uint256[2] calldata input
    ) external view returns (bool r);
}
