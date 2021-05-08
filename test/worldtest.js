const World = artifacts.require("./EtherEmpireWorld.sol");
const Combat = artifacts.require("./EtherEmpireCombat.sol");
const Diplomacy = artifacts.require("./EtherEmpireDiplomacy.sol");
const Trading = artifacts.require("./EtherEmpireTrading.sol");
const Token = artifacts.require("./EtherEmpireToken.sol");

contract("World and Trading", async (accounts) => {
    
    before(async() => {
        contract = await World.deployed();
        token = await Token.deployed();
        await contract.populateLand(3,3,1);
        map_size = 3 * 3;
    });

    it("divest is working", async() => {    
        await token.approve(contract.address, 1000, {from: accounts[0]});
        await token.transfer(accounts[1], 1000, {from: accounts[0]});
        await token.approve(contract.address, 1000, {from: accounts[1]});


        await contract.buildFarm(0,0,100, {from: accounts[0]});
        await contract.buildWall(0,1,100, {from: accounts[0]});
        await contract.harvestFarm(0,0,{from: accounts[0]});
        yield = await contract.yieldValue(0,0);
        await contract.buildWall(0,2,100, {from: accounts[1]});

        yield = await contract.yieldValue(0,0);
        console.log(parseInt(yield.toString()) / 2**32);

    })

    // it("entity transfer is working", async() => {
    //     await contract.populateLand(3,3,1);
    //     const map_size = 3 * 3;
    
    //     await token.approve(contract.address, 1000, {from: accounts[0]});
    //     await contract.buildFarm(0,0,100, {from: accounts[0]});
    //     await contract.changeEntityOwner(0 + map_size, accounts[1], {from: accounts[0]});
    //     let output = await contract.getEntityOwner(0 + map_size);
    //     assert.equal(output, accounts[1]);
    // })

    // it("call is working", async() => {
        
    //     await contract.buildFarm(1,0,100, {from: accounts[0]});
    //     await contract.signTreaty(st.address);
    //     let call_output = await st.invoke(1 + map_size, accounts[1]);
    //     output = await contract.getEntityOwner(1 + map_size);
    //     assert.equal(output, accounts[1]);


    // })
})