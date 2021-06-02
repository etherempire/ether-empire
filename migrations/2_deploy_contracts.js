const World = artifacts.require("EtherEmpireWorld");
const Combat = artifacts.require("EtherEmpireCombat");
const Diplomacy = artifacts.require("EtherEmpireDiplomacy");

const TokenMain = artifacts.require("EtherEmpireTokenMain");
const TokenSKALE = artifacts.require("EtherEmpireToken");

const TokenAirDrop = artifacts.require("TokenAirDrop");


module.exports = (deployer, network, accounts) => {

  // For testing out SKALE 
  if (network == "rinkeby") { 
      deployer.deploy(TokenMain).then(async (token) => {
      });

  } else if (network == "skale") {
      deployer.deploy(TokenSKALE).then(async (token) => {
        await deployer.deploy(Diplomacy);
        await deployer.link(Diplomacy, Combat);
        await deployer.deploy(Combat);
        
        await deployer.link(Diplomacy, World);
        await deployer.link(Combat, World);
  
        await deployer.deploy(World,
          new web3.utils.BN('1' + '0'.repeat(31), 2),
          new web3.utils.BN('1' + '0'.repeat(32), 2), // yield multiplayer - [0.5, 1.5]
          new web3.utils.BN('1' + '0'.repeat(33), 2), // Armies cost twice as much as wall 
          new web3.utils.BN('1' + '0'.repeat(31), 2), // Occupying farm burns half the token 
          token.address,
          0 // takes 0 blocks to divest farm 
        );
  
        let airdrop = await deployer.deploy(TokenAirDrop, token.address, 100);
        await token.approve(airdrop.address, 100000); 
        await airdrop.setSecret('103683354932'); // ONLY FOR TESTING, THIS SHOULD BE HIDDEN WHEN DEPLOYED PUBLICLY
        
        // For testing 
        let contract = await World.deployed();
        await contract.populateLand(10, 10, 1);
        

      });;
  }
 


};
