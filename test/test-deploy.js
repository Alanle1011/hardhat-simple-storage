const { ethers } = require("hardhat");
const {expect, assert} = require("chai")

// describe("SimpleStorage", () => {})
describe("SimpleStorage", function () {
    let simpleStorage, simpleStorageFactory;
    beforeEach(async function () {
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
        simpleStorage = await simpleStorageFactory.deploy();
    });

    it("It should start with a favourite number of 0", async function(){
      const currentValue = await simpleStorage.retrieve();
      const expectedValue = "0"; 
      
      assert.equal(currentValue.toString(), expectedValue)
    });
    it("Should Update when we call store", async function(){
      const expectedValue= "7"
      const transactionResponse = await simpleStorage.store(expectedValue)
      await transactionResponse.wait(1);

      const currentValue = await simpleStorage.retrieve()
      assert.equal(expectedValue, currentValue.toString() )
    })
});
