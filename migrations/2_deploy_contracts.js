const World = artifacts.require("./EtherEmpireWorld.sol");
const Combat = artifacts.require("./EtherEmpireCombat.sol");
const Diplomacy = artifacts.require("./EtherEmpireDiplomacy.sol");
const Token = artifacts.require("./EtherEmpireToken.sol");
const TokenAirDrop = artifacts.require("./TokenAirDrop.sol");

module.exports = function (deployer) {
  deployer.deploy(Diplomacy);
  deployer.link(Diplomacy, Combat);
  deployer.deploy(Combat);
  deployer.deploy(Token).then(

    async (instance) => {
      await deployer.link(Diplomacy, World);
      await deployer.link(Combat, World);

      await deployer.deploy(World,
        new web3.utils.BN('1' + '0'.repeat(31), 2),
        new web3.utils.BN('1' + '0'.repeat(32), 2), // yield multiplayer - [0.5, 1.5]
        new web3.utils.BN('1' + '0'.repeat(33), 2), // Armies cost twice as much as wall 
        new web3.utils.BN('1' + '0'.repeat(31), 2), // Occupying farm burns half the token 
        instance.address,
        0 // takes 0 blocks to divest farm 
      );

      //await deployer.deploy(TokenAirDrop, instance.address, 100);

      // For testing 
      let contract = await World.deployed();
      await contract.populateLand(6, 6, 1);
    }
  )


};
