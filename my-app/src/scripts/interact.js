require('dotenv').config();
const {ALCHEMY_API, ALCHEMY_API_URL, METAMASK_PRIVATE_KEY,CONTRACT_ADDRESS} = process.env;


export function test() {
  return (
    <div>{ALCHEMY_API}</div>
  )
}


