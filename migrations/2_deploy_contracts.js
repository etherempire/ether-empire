const GameWorld = artifacts.require("./GameWorld.sol");
const erc20 = artifacts.require("./GameToken.sol");

module.exports = function(deployer) {
  deployer.deploy(erc20);
  deployer.deploy(GameWorld, new web3.utils.BN('1' + '0'.repeat(112), 2), new web3.utils.BN('11' + '0'.repeat(112), 2));
};
