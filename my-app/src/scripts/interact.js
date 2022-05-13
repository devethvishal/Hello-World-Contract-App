import env from 'react-dotenv';

export function Interact() {
  //const name = 'Vishal'
  
  return (
    <div><p>{console.table(env)}</p></div>
  )
}


