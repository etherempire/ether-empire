const path = require("path");
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
     },
    
  }
};
