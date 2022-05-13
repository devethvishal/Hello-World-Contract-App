
require("@nomiclabs/hardhat-ethers");

const {ALCHEMY_API_URL, METAMASK_PRIVATE_KEY} = require('react-dotenv');

module.exports = {
   solidity: "0.7.3",
   defaultNetwork: "ropsten",
   networks: {
      hardhat: {},
      ropsten: {
         url: ALCHEMY_API_URL,
         accounts: [`0x${METAMASK_PRIVATE_KEY}`]
      }
   },
  
}