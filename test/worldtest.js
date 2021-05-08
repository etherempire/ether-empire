const World = artifacts.require("./EtherEmpireWorld.sol");
const Combat = artifacts.require("./EtherEmpireCombat.sol");
const Diplomacy = artifacts.require("./EtherEmpireDiplomacy.sol");
const Trading = artifacts.require("./EtherEmpireTrading.sol");
const Token = artifacts.require("./EtherEmpireToken.sol");
const EntityTransferST = artifacts.require("./smart_treatires/EntityTransferST.sol");

// contract("EtherEmpireToken", async (accounts) => {

// });



contract("EtherEmpireTrading", async (accounts) => {
    
    before(async() => {
        contract = await World.deployed();
        token = await Token.deployed();
        st = await EntityTransferST.deployed();
        await contract.populateLand(3,3,1);
        await token.approve(contract.address, 1000, {from: accounts[0]});
        map_size = 3 * 3;
    });
    // it("entity transfer is working", async() => {
    //     await contract.populateLand(3,3,1);
    //     const map_size = 3 * 3;
    
    //     await token.approve(contract.address, 1000, {from: accounts[0]});
    //     await contract.buildFarm(0,0,100, {from: accounts[0]});
    //     await contract.changeEntityOwner(0 + map_size, accounts[1], {from: accounts[0]});
    //     let output = await contract.getEntityOwner(0 + map_size);
    //     assert.equal(output, accounts[1]);
    // })

    it("call is working", async() => {
        
        await contract.buildFarm(1,0,100, {from: accounts[0]});
        await contract.signTreaty(st.address);
        let call_output = await st.invoke(1 + map_size, accounts[1]);
        output = await contract.getEntityOwner(1 + map_size);
        assert.equal(output, accounts[1]);


    })
})