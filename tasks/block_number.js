const {task} = require("hardhat/config")

task("block-number","Print the current block number")
.setAction(
    // const blocktask= async function() => {}
    // async function blockTask() {}
    async (taskArgs, hre) =>{
        const blockNumber = await hre.ethers.provider.getBlockNumber()
        console.log(`Current block number: ${blockNumber}`)
    }
)
module.exports= {}