const Tx = require("ethereumjs-tx").Transaction;
const secret = require("../secret.json");

module.exports = () => {
  let rinkebyABIs = require("../client/src/contracts/rinkeby_ABIs.json");
  let rinkebyERC20ABI = require("../client/src/contracts/EtherEmpireTokenMain.json");
  let privateKey = new Buffer(
    process.env.val1,
    "hex"
  );
  let erc20OwnerForMainnet = secret.skale_owner;
  let schainName = secret.skale_name;
  let chainId = secret.skale_chainId;
  const lockAndDataAddress =
    rinkebyABIs.lock_and_data_for_mainnet_erc20_address;
  const lockAndDataBoxABI = rinkebyABIs.lock_and_data_for_mainnet_erc20_abi;
 
        const erc20AddressOnMainnet = rinkebyERC20ABI.networks[secret.rinkeby_id].address;
        let LockAndDataForMainnet = new web3.eth.Contract(
          lockAndDataBoxABI,
          lockAndDataAddress
        );

        /**
         * Uses the SKALE LockAndDataForMainnetERC20
         * contract function addERC20TokenByOwner
         */
      let addERC20TokenByOwner = LockAndDataForMainnet.methods
          .addERC20TokenByOwner(schainName, erc20AddressOnMainnet)
          .encodeABI();
      
      
        web3.eth.getTransactionCount(erc20OwnerForMainnet).then((nonce) => {
          const rawTxAddERC20TokenByOwner = {
            chainId: chainId,
            from: erc20OwnerForMainnet,
            nonce: "0x" + nonce.toString(16),
            data: addERC20TokenByOwner,
            to: lockAndDataAddress,
            gas: 6500000,
            gasPrice: 100000000000,
            value: web3.utils.toHex(
                web3.utils.toWei("0", "ether")
            )
          };
          //sign transaction
          const txAddERC20TokenByOwner = new Tx(rawTxAddERC20TokenByOwner, {
            chain: "rinkeby",
            hardfork: "petersburg"
          });
          txAddERC20TokenByOwner.sign(privateKey);
          const serializedTxDeposit = txAddERC20TokenByOwner.serialize();
          //send signed transaction (addERC20TokenByOwner)
          web3.eth
            .sendSignedTransaction("0x" + serializedTxDeposit.toString("hex"))
            .on("receipt", (receipt) => {
              console.log(receipt);
            })
            .catch(console.error);
        });
      
  

}