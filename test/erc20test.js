const World = artifacts.require("./EtherEmpireWorld.sol");
const Combat = artifacts.require("./EtherEmpireCombat.sol");
const Diplomacy = artifacts.require("./EtherEmpireDiplomacy.sol");
const Token = artifacts.require("./EtherEmpireToken.sol");

contract("EtherEmpireToken", async (accounts) => {
    it("should enable user to perform action after approving token transfer", async() => {
        let contract = await World.deployed();
        let token = await Token.deployed();

        contract.populateLand(3,3,1);

        // verify that transferFrom and approve are working
        token.approve(contract.address, 1000, {from: accounts[0]});
        contract.buildFarm(0,0,500, {from: accounts[0]});

    })
});
