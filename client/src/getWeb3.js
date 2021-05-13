import Web3 from "web3";


export const getWeb3 = () =>
  new Promise(async (resolve, reject) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.

    // Modern dapp browsers...
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        // Request account access if needed
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        // Acccounts now exposed
        resolve(web3);
      } catch (error) {
        reject(error);
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      // Use Mist/MetaMask's provider.
      const web3 = window.web3;
      console.log("Injected web3 detected.");
      resolve(web3);
    }
    // Fallback to localhost; use dev console port by default...
    else {
      const provider = new Web3.providers.HttpProvider(
        "http://127.0.0.1:8545"
      );
      const web3 = new Web3(provider);
      console.log("No web3 instance injected, using Local web3.");
      resolve(web3);
    }

  });

export const isMetaMaskInstalled = () => {
  if (window.ethereum) {
    return window.ethereum.isMetaMask
  }
  return false
}

export const isMetaMaskConnected = () => {
  return window.ethereum.isConnected()
}

export const isAddressConnected = () => {
  if (window.ethereum && window.ethereum.selectedAddress) {
    return true
  }
  return false
}

export const getExistingWeb3 = () => {
  return new Web3(window.ethereum);
}

// SWITCH TO MATIC TESTNET
export const switchToMatic = async () => {
  let switchToMatic = [{
    "chainId": "0x13881",
    "chainName": "Mumbai Testnet",
    "rpcUrls": ["https://rpc-mumbai.matic.today"],
    "nativeCurrency": {
      "name": "MATIC",
      "symbol": "MATIC",
      "decimals": 18
    }
  }]
  // Modern dapp browsers...
  if (window.ethereum) {
    try {
      //switch to MATIC (POLYGON)
      console.log("switch to MATIC blockchain");
      window.ethereum
        .request({
          method: "wallet_addEthereumChain",
          params: switchToMatic
        })
        .catch((error) => console.log(error.message));
      console.log("finished switching to MATIC (POLYGON)");
    } catch (error) {
      alert("Failed to switch to MATIC");
    }
  }
}

// SWITCH TO SKALE Chain
export const switchToSKALE = async () => {
  const endpoint = "https://eth-global-11.skalenodes.com:10072";
  const chainId = "0x6053f681996d2";
  let switchToSKALEparams = [{
    chainId: chainId,
    chainName: "SKALE Network | Ether Empire",
    rpcUrls: [endpoint],
    nativeCurrency: {
      name: "SKALE ETH",
      symbol: "skETH",
      decimals: 18
    },
    blockExplorerUrls: [
      "https://expedition.dev/?network=SKALE&rpcUrl=" + endpoint
    ]
  }];
  // Modern dapp browsers...
  if (window.ethereum) {
    try {
      console.log("switch to SKALE chain");
      window.ethereum
        .request({
          method: "wallet_addEthereumChain",
          params: switchToSKALEparams
        })
        .catch((error) => console.log(error.message));
      console.log("finished switching to SKALE");
    } catch (error) {
      alert("Failed to switch to SKALE");
    }
  }
}


