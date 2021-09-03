// *** contracts directory for smart contract

//Contract based on https://docs.openzeppelin.com/contracts/3.x/erc721

//*** 1. Smart Contract (Solidity)

// SPDX-License-Identifier: MIT
pragma solidity ^0.7.3;

/*
 ***  implements the ERC721 standard
    * openzeppelin : Smart Contract Template
    * 
*/

import "@openzeppelin/contracts/token/ERC721/ERC721.sol"; 
// keeps track of the number of tokens issued
import "@openzeppelin/contracts/utils/Counters.sol"; //used for increment tokenId
import "@openzeppelin/contracts/access/Ownable.sol"; //check whether smart contract belong to owner or not

// Accessing the Ownable method ensures that only the creator of the smart contract can interact with it
contract PopNFT is ERC721, Ownable { // *** smart contract that follow ERC-721
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // the name and symbol for the NFT
    constructor() public ERC721("PopClarcToken", "POP") {} //this decide the token name and symbol when created

    // ***Create a function to mint/create the NFT
    // * receiver : takes a type of address. This is the wallet address of the user that should receive the NFT minted using the smart contract
    // * tokenURI : takes a string that contains metadata about the NFT

    function createNFT(address receiver, string memory tokenURI) //Minting Process
        public onlyOwner
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(receiver, newItemId); //ERC-721 build in method 
        _setTokenURI(newItemId, tokenURI); //ERC-721 build in method

        // returns the id for the newly created token
        return newItemId;
    }
}