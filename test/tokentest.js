const Token = artifacts.require("./EtherEmpireToken.sol");
const World = artifacts.require("./EtherEmpireWorld.sol");
const Types = artifacts.require("./EtherEmpireTypes.sol");

contract("Token", async (accounts) => {
    
    before(async() => {
        contract = await World.deployed();
        contract.web3Instance = new web3.eth.Contract(contract.abi, contract.address);
        token = await Token.deployed();
        token.web3Instance = new web3.eth.Contract(token.abi, token.address); 
        await contract.populateLand(3,3,1);
        map_size = 3 * 3;
    });

    

    it("approveAndCall is working", async() => {   
        let buildFarmAbi = contract.web3Instance.methods.buildFarm(0,0,100).encodeABI();
        await token.approveAndCall(contract.address, 100, buildFarmAbi);
        let tileType = await contract.allEntities(map_size); 
        console.log(tileType.entityType);
        // assert.equal(Types.EntityTypes.Farm);
    });
});