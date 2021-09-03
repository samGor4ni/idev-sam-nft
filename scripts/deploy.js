// *** scripts directory for other script

// *** this scripts is to deploy our smart contract to the Ethereum blockchain

async function main() {
    const [deployer] = await ethers.getSigners(); //etherjs 
    console.log("Deploying contracts with the account:", deployer.address);

    console.log("Account balance:", (await deployer.getBalance()).toString());
    const POP = await ethers.getContractFactory("PopNFT");

    // Start deployment, returning a promise that resolves to a contract object
    const pop = await POP.deploy();
    console.log("Contract deployed to address:", pop.address); //can search this address in etherscan, can saw all transaction
}

 main().then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });