export class ContractCaller{

  constructor(web3){
    this.web3 = web3.web3
    this.accounts = web3.accounts
    this.instance = web3.instance
    this.tokenInstance = web3.tokenInstance

    // get user funds 
    this.checkSufficientBalance(0);
  }

  createWall = (tileInfo, userInputedStakeAmount) => {
    const posX = tileInfo.x
    const posY = tileInfo.y
    console.log("creating wall at " + posX + "," + posY)
    tileInfo.isWall = true
    tileInfo.value = userInputedStakeAmount
    tileInfo.isEmpty = false
  }

  depositeERC20 = (userInputedStakeAmount) => {
    this.tokenInstance.methods.approve(this.instance.options.address, parseFloat(userInputedStakeAmount) * Math.pow(10, this.decimals))
      .send({ from: this.accounts[0] })
      .on('error', (error) => {
        console.log('Error depositing ERC20 tokens: ', error)
        return false
      }) //error should be indicated to user
      .then(() => { return true })
  }


  // verify user has approved sufficient funds to main contract, then continue with callback 
  checkSufficientBalance = async (amount) => {
    try {
      let allowance = await this.tokenInstance.methods.allowance(this.accounts[0], this.instance.options.address).call({ from: this.accounts[0] })
      let balance = await this.tokenInstance.methods.balanceOf(this.accounts[0]).call({ from: this.accounts[0] })
      balance = Math.min(allowance, balance) // Ignore allowance that exceeds user balance 
      // update global variable 
      
      if (!this.decimals) 
      {
        this.decimals = await this.tokenInstance.methods.decimals().call({ from: this.accounts[0] }); 
      }

      this.ERC20balance = balance / Math.pow(10, this.decimals);

      if (balance < amount) {
        // insufficient approved funds
        console.log(balance, amount);
        console.log('User has insufficient ERC20 balance');
        return false;
      }
      return true;
    } catch (error) {
      console.log('Error checking for user ERC20 balance: ', error);
      return false;
    }
  }

  createFarm = (tileInfo, userInputedStakeAmount) => {

    const posX = tileInfo.x
    const posY = tileInfo.y

    const callback = (amount, tile) => {
      this.instance.methods.buildFarm(posX, posY, parseFloat(amount) * Math.pow(10, this.decimals))
        .send({ from: this.accounts[0] })
        .on('error', (error) => { console.log('Error Submitting Task: ', error) }) //error should be indicated to user
        .then(() => {
          console.log("Transaction successful");

          tile.isFarm = true
          tile.value = amount // fix: amount different from that of contract. Land value = sqrt(amount * 1000) * modifier 
          tile.owner = this.accounts[0]
          tile.isEmpty = false

        })
    }
    // this.checkSufficientBalance(amount).then( success => { console.log(success); if (success) callback(amount);});
    callback(userInputedStakeAmount, tileInfo);
  }

  createArmy = (tileInfo, userInputedStakeAmount) => {
    const posX = tileInfo.x
    const posY = tileInfo.y
    tileInfo.containsArmy = true
    tileInfo.armyValue = userInputedStakeAmount
    tileInfo.armyOwner = this.accounts[0]
  }

  divestFarm = (tileInfo) => {
    const posX = tileInfo.x
    const posY = tileInfo.y
    tileInfo.isFarm = false
    tileInfo.isEmpty = true
    tileInfo.value = 0
    tileInfo.owner = null

  }

  pillageFarm = (tileInfo) => {
    tileInfo.value = 0
    tileInfo.isFarm = false
    tileInfo.isEmpty = true
  }

  attackDirection = (tileInfo, enemyInfo) => {
      enemyInfo.containsArmy = false
      enemyInfo.armyOwner = null
      enemyInfo.armyValue = 0
  }

  destroyDirection = (tileInfo, wallInfo) => {
      wallInfo.isWall = false
      wallInfo.isEmpty = true
      wallInfo.value = 0
  }

  moveArmy = (tileInfo, moveTileInfo) => {
    moveTileInfo.containsArmy = true
    moveTileInfo.armyOwner = tileInfo.armyOwner
    moveTileInfo.armyValue = tileInfo.armyValue
    tileInfo.containsArmy = false
    tileInfo.armyOwner = null
    tileInfo.armyValue = 0
  }
}
