/**
* @type import('hardhat/config').HardhatUserConfig
*/

require('dotenv').config();
require("@nomiclabs/hardhat-ethers"); //ether-js : library that simplifies interacting with the Ethereum blockchain

// API_URL : Node Url that we deploy in Alchemy

// METAMASK_PRIVATE_KEY : 
// - your wallet account key (confidential), to connect our MetaMask wallet to our project
// - every transaction will required gas fee, charged from this wallet

const { API_URL, METAMASK_PRIVATE_KEY } = process.env;

module.exports = {
   	solidity: {
	    version: "0.7.3",
	    settings: {
	      optimizer: {enabled: true},
	    }
	},
   	defaultNetwork: "rinkeby", //other testnet : Ropsten, Kovan, Goerli
   	networks: {
     	hardhat: {},
      	ropsten: {
        	url: API_URL,
         	accounts: [`0x${METAMASK_PRIVATE_KEY}`]
      	},
      	rinkeby: {
        	url: API_URL,
         	accounts: [`0x${METAMASK_PRIVATE_KEY}`]
      	}
   	},
}
