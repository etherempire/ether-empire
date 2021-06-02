const Common = require('ethereumjs-common').default;
const Tx = require("ethereumjs-tx").Transaction;
const secret = require("../secret.json");


module.exports = () => 
{
  let schainABIs = require("../client/src/contracts/schain_ABIs.json");
let schainERC20ABI = require("../client/src/contracts/EtherEmpireToken.json");
let contractOwnerPrivateKey = new Buffer(
  process.env.val1,
  "hex"
);
let contractOwnerAccount = secret.skale_owner;
// let schainEndpoint = secret.skale_endpoint;
let chainId = secret.skale_chainId;
const customCommon = Common.forCustomChain(
  "mainnet",
  {
    name: "skale-network",
    chainId: chainId
  },
  "istanbul"
);

const erc20ABI = schainERC20ABI.abi;
const erc20Address = schainERC20ABI.networks[secret.skale_chainId_dec].address;
const lockAndDataForSchainERC20Address =
  schainABIs.lock_and_data_for_schain_erc20_address;
// const web3ForSchain = new web3(schainEndpoint);
let schainERC20Contract = new web3.eth.Contract(
  erc20ABI,
  erc20Address
);

/**
 * Uses the openzeppelin ERC20Mintable
 * contract function addMinter
 * https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20
 */
let addMinter = schainERC20Contract.methods
  .addMinter(lockAndDataForSchainERC20Address)
  .encodeABI();



web3.eth.getTransactionCount(contractOwnerAccount).then((nonce) => {
  //create raw transaction

  const rawTxAddMinter = {
  chainId: chainId,
    from: contractOwnerAccount,
    nonce: nonce,
    data: addMinter,
    to: erc20Address,
    gasPrice: 100000000000,
    gas: 8000000,
    value: 0
  };

  //sign transaction
  const txAddMinter = new Tx(rawTxAddMinter, { common: customCommon });
  txAddMinter.sign(contractOwnerPrivateKey);
  const serializedTxAddMinter = txAddMinter.serialize();
  //send signed transaction (add minter)
  web3.eth
    .sendSignedTransaction("0x" + serializedTxAddMinter.toString("hex"))
    .on("receipt", (receipt) => {
      console.log(receipt);
    })
    .catch(console.error);
});


}
