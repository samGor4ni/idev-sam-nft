# idev-sam-nft
Demo project for iDev presentation, create our own NFT with Alchemy, Pinata, Ethereum Testnet

What is using?

- Blockchain (Ethereum Testnet - Rinkeby)
- Node (Alchemy) 
- Wallet (Metamask) 
- NodeJS & NPM 
- Development Tools / Package  (Hardhat, OpenZeppelin, EtherJS, Web3.js)
- File storage (Pinata)

What contain?

- Smart Contract (Solidity)
- Deploy Script (Javascript)
- Minting Script (Javascript)


Command to run (explaination) : 
    - npx hardhat  
      - (initialise hardhat) 
    - npx hardhat compile 
      - (test everything work fine or not, generate artifact folder)
    - npx hardhat run scripts/deploy.js --network rinkeby 
      - (deploy smart contract to Ethereum network)
    - node scripts/mint-nft.js
      - (minting NFT) 

Reference Article: https://blog.logrocket.com/how-to-create-nfts-with-javascript/
