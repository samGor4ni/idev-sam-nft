require('dotenv').config();
const API_URL = process.env.API_URL;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3"); //alchemy-web3 library
const alchemyWeb3 = createAlchemyWeb3(API_URL); //connect to my Alchemy node 

const contract = require("../artifacts/contracts/PopClarcNFT.sol/PopNFT.json"); 
const contractAddress = "0x25df36CD922C3cc073dE74b770808c9168BA1556"; //address that I deploy to Blockchain when run script deploy.js
const nftContract = new alchemyWeb3.eth.Contract(contract.abi, contractAddress);

const METAMASK_PUBLIC_KEY = process.env.METAMASK_PUBLIC_KEY; //wallet address
const METAMASK_PRIVATE_KEY = process.env.METAMASK_PRIVATE_KEY; //wallet private key (confidential)

async function mintNFT(tokenURI) {
    // get the nonce - nonce is needed for security reasons. It keeps track of the number of
    // transactions sent from our address and prevents replay attacks.
	const nonce = await alchemyWeb3.eth.getTransactionCount(METAMASK_PUBLIC_KEY, 'latest');
	
	const tx = {
		from: METAMASK_PUBLIC_KEY, // our MetaMask public key (pay gas fee)
		to: contractAddress, // the smart contract address we want to interact with
		nonce: nonce, // nonce with the no of transactions from my account
		gas: 1000000, // fee estimate to complete the transaction
		data: nftContract.methods
		  .createNFT(METAMASK_PUBLIC_KEY, tokenURI) //METAMASK_PUBLIC_KEY - NFT belongs to the same wallet paying the gas fee
		  .encodeABI(), // call the createNFT function from our PopClarcNFT.sol file and pass the account that should receive the minted NFT.
	};

	// sign off of the transaction with METAMASK_PRIVATE_KEY
	// signing transaction is compulsory before sending to Ethereum Network, in order to validate that the origin of the transaction
	const signPromise = alchemyWeb3.eth.accounts.signTransaction(
		tx,
		METAMASK_PRIVATE_KEY
	);

	signPromise.then((signedTx) => {
	  	alchemyWeb3.eth.sendSignedTransaction( //broadcast over Ethereum Network
	    	signedTx.rawTransaction,
	    	function (err, hash) {
	      		if (!err) {
		        	console.log(
		          		"The hash of our transaction is: ",
		          		hash,
		          		"\nCheck Alchemy's Mempool to view the status of our transaction!"
		        	);
	      		} else {
	        		console.log(
	          			"Something went wrong when submitting our transaction:",
	          			err
	        		);
	      		}
	    	}
	  	);
	})
	.catch((err) => {
	  	console.log(" Promise failed:", err);
	});
}

mintNFT("https://ipfs.io/ipfs/Qmd2sgUKLyveVEbmfNHDNWJNz2sAs9PAfTqbmfKUjFAVdk") // pass the CID to the JSON file uploaded to Pinata

