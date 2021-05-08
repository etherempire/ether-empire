const Token = artifacts.require("./EtherEmpireToken.sol");
const CrowdSale = artifacts.require("./TokenCrowdSale.sol");

contract("EtherEmpireToken", async (accounts) => {
    
    before(async() => {
        token = await Token.deployed();
        crowdsale = await CrowdSale.deployed();
        await token.approve(crowdsale.address, 100000);
    });


    it("crowdsale is working", async() => {
        await crowdsale.buy.sendTransaction({from: accounts[1], value: web3.utils.toWei('0.1', 'ether')});
        
    })
})