import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios  from 'axios'

function App() {
  const [jokes, setJokes] = useState([]);
  useEffect(()=>{
    axios.get('/api/jokes') // //localhost:3000 not important to be added
    .then((response)=>{
      setJokes(response.data);
    })
    .catch((error)=>{
      console.log(error);
    
    })
  })
  return (
    <>
      <h1>Chai and fullStack!!!</h1>
      <p>JOKES: {jokes.length}</p>
      <p style={{color: 'green'}}>The backend has been succesfully connected!</p>
      {
        jokes.map((joke,index)=>(
          <div key={joke.id}>
            <p>{joke.Joke}</p>
          </div>
        ))
      }
    </>
  )
}

export default App
