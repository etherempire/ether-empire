const path = require("path");

let HDWalletProvider = require("truffle-hdwallet-provider");
const secret = require("./secret.json");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      },
      version: "0.8.3"
    }
  }, 
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {

    // Corresponds with blockchain hosted by Ganache 
    development: {
      gasPrice:1,
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
      // gas: 10000000
     },

     skale: {
      provider: () => new HDWalletProvider(process.env.val1, secret.skale),
      gasPrice: 0,
      network_id: "*", 
     },

     rinkeby: {
      provider: function() { 
       return new HDWalletProvider(process.env.val1, secret.rinkeby);
      },
      network_id: 4,
      gas: 4500000,
      gasPrice: 10000000000,
    },

    mumbai: {
      provider: () => new HDWalletProvider(process.env.val2, `https://rpc-mumbai.matic.today`),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    }

    
  }
};
