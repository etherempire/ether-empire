const World = artifacts.require("./EtherEmpireWorld.sol");
const Combat = artifacts.require("./EtherEmpireCombat.sol");
const Diplomacy = artifacts.require("./EtherEmpireDiplomacy.sol");
const Token = artifacts.require("./EtherEmpireToken.sol");

module.exports = function(deployer) {
      deployer.deploy(Token)
      deployer.deploy(Diplomacy);
      deployer.link(Diplomacy, Combat);
      deployer.deploy(Combat);
      deployer.deploy(Token).then(
        
        async () => {
          
         
          await deployer.link(Diplomacy, World);
          await deployer.link(Combat, World);
    
          await deployer.deploy(World, 
            new web3.utils.BN('1' + '0'.repeat(31), 2), 
            new web3.utils.BN('1' + '0'.repeat(32), 2), // yield multiplayer - [0.5, 1.5]
            new web3.utils.BN('1' + '0'.repeat(33), 2), // Armies cost twice as much as wall 
            new web3.utils.BN('1' + '0'.repeat(31), 2), // Occupying farm burns half the token 
            Token.address
            );
        }
      )
      
     
};
