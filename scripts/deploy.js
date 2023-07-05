//import

const { ethers, run, network } = require("hardhat");
require("dotenv").config();

//async main function
async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    );
    console.log("Deploying, please wait...");
    const simpleStorage = await SimpleStorageFactory.deploy();
    await simpleStorage.deployed();
    console.log(`Deployed Contract to : ${simpleStorage.address}`);
    
    if(network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY){
        console.log("Waiting for block txes ...")
        await simpleStorage.deployTransaction.wait(6)
        await verify(simpleStorage.address, [])
    };

    const currentValue =await simpleStorage.retrieve();
    console.log(`Current Value is: ${currentValue}`);
    const updateValue= await simpleStorage.store(7);
    await updateValue.wait(1);
    const updatedValue = await simpleStorage.retrieve();
    
    console.log(`Updated Value is: ${updatedValue}`)



}

async function verify(contractAddress, args){
    console.log("Verifying contract ...")
    try{
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    }catch (e) {
        if(e.message.toLowerCase().includes("already verify")){
            console.log("Already Verify")
        }else{
            console.log(e)
        }
    }
    


}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
