import React, { useState, useEffect } from "react";
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import "./Crowdsale.css"


function Crowdsale(props) {

  const [secretKey, setSecretKey] = useState("");
  const [discordUsername, setDiscordUsername] = useState("");

  let state = props.web3;

  //0xebf0f629324a18a9c609ce91d2b11431dde2b42967f046d02360942ee0b96b62
  function confirmKey() {
    const key = secretKey.substring(2);
    let key_rebased = state.web3.utils.toBN(key, 16);
    props.web3.airDropInstance.methods.claim(key_rebased.toString(), discordUsername)
      .send({ from: state.accounts[0] })
      .on('error', (error) => {
        console.log("Error confirming secret key: ", error)

      })
      .then(() => {
        console.log("Secret key confirmed. Coins deposited to account")
      })
  }


  return (
    <div className="Crowdsale">
      <center><h2 className="title">Free Empire tokens</h2></center>
      <InputGroup >
        <Input placeholder="Secret key" value={secretKey} onChange={e => setSecretKey(e.target.value)} required />
        <Input placeholder="Discord Username" value={discordUsername} onChange={e => setDiscordUsername(e.target.value)} required />
        <InputGroupAddon addonType="append">
          <InputGroupText className="confirm" onClick={confirmKey}>Confirm</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );

}
export default Crowdsale;