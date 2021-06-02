const Common = require('ethereumjs-common').default;
const Tx = require("ethereumjs-tx").Transaction;
const secret = require("../secret.json");

module.exports = () => {
  let rinkebyERC20ABI = require("../client/src/contracts/EtherEmpireTokenMain.json");
  let schainABIs = require("../client/src/contracts/schain_ABIs.json");
  let schainERC20ABI = require("../client/src/contracts/EtherEmpireToken.json");
  let privateKey = new Buffer(
    process.env.val1,
    "hex"
  );
  let erc20OwnerForSchain = secret.skale_owner;
  let chainId = secret.skale_chainId;
  const customCommon = Common.forCustomChain(
    "mainnet",
    {
      name: "skale-network",
      chainId: chainId
    },
    "istanbul"
  );
  const lockAndDataAddress = schainABIs.lock_and_data_for_schain_erc20_address;
  const lockAndDataBoxABI = schainABIs.lock_and_data_for_schain_erc20_abi;
  const erc20AddressOnMainnet = rinkebyERC20ABI.networks[secret.rinkeby_id].address;
  const erc20AddressOnSchain = schainERC20ABI.networks[secret.skale_chainId_dec].address;
  let LockAndDataForSchain = new web3.eth.Contract(
    lockAndDataBoxABI,
    lockAndDataAddress
  );
  /**
   * Uses the SKALE LockAndDataForSChain
   * contract function addERC20TokenByOwner
   */
let addERC20TokenByOwner = LockAndDataForSchain.methods
    .addERC20TokenByOwner(
      "Mainnet",
      erc20AddressOnMainnet,
      erc20AddressOnSchain
    )
    .encodeABI();
  web3.eth.getTransactionCount(erc20OwnerForSchain).then((nonce) => {

    
    const rawTxAddERC20TokenByOwner = {
        chainId: chainId,
      from: erc20OwnerForSchain,
      nonce: nonce,
      data: addERC20TokenByOwner,
      to: lockAndDataAddress,
      gas: 6500000,
      gasPrice: 100000000000,
      value: web3.utils.toHex(web3.utils.toWei("0", "ether"))
    };
    //sign transaction
    const txAddERC20TokenByOwner = new Tx(rawTxAddERC20TokenByOwner, { common: customCommon });
    console.log(nonce);

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