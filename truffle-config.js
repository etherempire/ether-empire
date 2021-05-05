const path = require("path");

let HDWalletProvider = require("@truffle/hdwallet-provider");
const secret = require("./secret.json");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  compilers: {
    solc: {
      version: "0.8.3"
    }
  }, 
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {

    // Corresponds with blockchain hosted by Ganache 
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
      // gas: 10000000
     },

     skale: {
      provider: () => new HDWalletProvider(secret.privateKey, secret.skale),
      gasPrice: 0,
      network_id: "*", 
      skipDryRun: true 
     }
    
  }
};
