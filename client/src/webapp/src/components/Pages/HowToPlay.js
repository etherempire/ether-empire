import React, { Component } from "react";
import "../CSS/Tutorial.css";

class HowToPlay extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="tutorial">
        <br />
        <h1>GETTING STARTED</h1><br /><br />
        <h2>Set Up</h2>

        <p><b>Install MetaMask extension {this.props.installed ? "✔️" : "❌"}</b></p>
        {!this.props.installed ? <ol>
          <li>Visit <a target="_blank" href="https://metamask.io/download.html">MetaMask.io</a></li>
          <li>Install MetaMask for your browser</li>
          <li>Come on back to finish setup</li>
        </ol> : <p/> }
        
        <p><b>Connect to MetaMask extension {this.props.connected ? "✔️" : "❌"}</b></p>
        {!this.props.connected && this.props.installed ? <ol>
          <li>Press "Connect MetaMask" button</li>
          <li>Connect using MetaMask popup</li>
        </ol> : <p/> }

        {this.props.connected && this.props.installed ? <p><b>You are all set! ✔️</b></p> : <p/>}
        

        <br />

        <h2>Ether Empire Game Idea</h2>
        <p>This is a game of conquest hosted entirely on the blockchain,
        with intuitive game mechanics that allow for endless options of strategy, diplomacy,
        and an opportunity to earn real money. </p> <br />

        <h2>Game Universe 🌐</h2>
        <p>The objective of this game is simple — to battle for control over a fixed area of territory,
        so that you can carve for yourself profitable farmlands that regularly generate ABC tokens.
        These tokens can then be traded on decentralized exchanges such as Uniswap and Pancakeswap for ETH or BTC. </p>
        <p>Of course, for every one of you intrepid adventurers out there looking to make a fortune,
        there are many more with the same aspirations. As such, you should expect resistance in all forms,
        such as pillaging armies or hostile coalitions against your kingdom. To this end, you must subdue your competition,
        either through combat or diplomacy.</p><br />

        <h2>Combat 🔥</h2>
        <p>There are 3 entities in this game: Farm, Army, and Wall.
        Farm, as shown above, is responsible for generating yield in your kingdom and generates ABC tokens
        for your treasury which can be exchanged for money. The multiplier for farm yield differs according to the farm’s
        location on the map and can be seen through the Yield Lens. Army refers to mobile units on the map that can be fielded
        on the farm plots that you own. You can use the Army to capture other players’ farms.
        Army maneuvering plays a large role in ensuring successful invasions. Since armies take attrition when not on friendly farmlands,
        it is important to carefully plan their journey prior to launching an attack.
        Wall is your line of defense against pillaging armies. When hostile armies attack a wall tile,
        there will be a dice roll accounting for the relative strength of the army and wall,
        and depending on the result of the dice roll, either the wall or the army takes damage.
        Note that your armies can also be used to counter and intercept hostile armies.
        </p><br />

        <h2>Diplomacy 👐</h2>
        <p>Not every conflict needs to be resolved with violence. Utilizing the smart contract technology on the Ethereum blockchain,
        Ether Empire allows you to craft customized treaties with your neighbors to secure peace and lucrative deals.
        Fixed-duration peace treaties and cost-sharing contracts are some useful arrangements that you can enter with other players.
        For instance, you can</p>
        <ul>
          <li>Create a coalition with multiple neighbors</li>
          <li>Mandate a regular contribution of ABC tokens towards maintaining a common army</li>
          <li>Fund wall construction </li>
        </ul>
        <p>
          For more options, you can also browse through user-created treaties on our dApp.
          Treaties are only a means to an end, do not become complacent.
          If your peace treaties are nearing expiry and your neighbors are less than enthusiastic about renewing them,
          then it may be time to start amassing your own army and building fortification!
        </p>
        <br />

        <h2>Player-driven Economy 💰</h2>
        <p>The economy in this game is entirely driven by the actions of the players.
        We maintain the value of ABC tokens by enforcing the following set of tokenomics measures:</p>
        <ol>
          <li>For every farmland that is pillaged, half the amount is transferred to the
          pillager while the rest of the land value is burnt (deflationary).</li>
          <li>Tokens spent on wall construction and army recruitment are burnt (deflationary)</li>
          <li>The amount of burnt tokens are re-distributed into the world through increased
          farm yields (inflationary) </li>
        </ol>
        <p>These rules help stabilize the total supply of ABC tokens in the world.
        They also organically incentivize risk-taking — the more wars and constructions taking place in the world,
         the higher the rate of token burning, the more profitable farming becomes.</p><br />

        <h2>End Game</h2>
        <p>Ether Empire currently hosts game worlds that last for 1 week,
        1 month and 1 year. You may choose the timespan that best matches your appetite for gains.
        Of course, longer games will have a larger map size and a higher players cap,
        thus providing greater potential for reward. At the end of a world’s lifespan,
          all farmlands will be instantly divested and their total land value returned to the player’s treasury.</p>
        <br /><br /><br /><br /><br />
      </div>
    );
  }
}
export default HowToPlay;