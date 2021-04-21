const GameWorld = artifacts.require("./GameWorld.sol");
module.exports = function(deployer) {
  deployer.deploy(GameWorld, new web3.utils.BN('1' + '0'.repeat(112), 2), new web3.utils.BN('11' + '0'.repeat(112), 2));
};
