import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import styled, { keyframes } from 'styled-components'
import UploadForm from './UploadForm'
import File from './File'

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`
const StyledApp = styled.div`
  position: fixed;
  background:transparent;
  animation:400ms ${fadeIn} ease-in;
  top: 0;
  left: 0;
  width: calc(100vw - 1em);
  height: 100%;
  font-size: calc(.3vh + .3vw + 5px);
  margin: 0 0em 0 1em;
  display: flex;
  flex-wrap: wrap;
  transition: 500ms;
  align-content: flex-start;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  background: transparent;
  overflow-y: auto;
  overflow-x: hidden;
`

const App = () => {

  const [itemArray, setItemArray] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchFromServer = async () => {
    await axios.get(`http://localhost:8001/api/getall`)
      .then((res) => res.data)
      .then((data) => setItemArray(data.files))
      .catch((e) => console.log(e))
    setLoading(false)
  }

  useEffect(() => {
    console.log('process.env.NODE_ENV',process.env.NODE_ENV)
    fetchFromServer()
  }, [])


  const remove = async (id) => {
    setItemArray(itemArray.filter((i) => i.id !== id))
    try{
      await axios.delete(`http://localhost:8001/api/delete/${id}`)
    } catch (e) {
      console.log(e)
      fetchFromServer()
    }
  }

  return loading ? <div>loading...</div> : (
    <StyledApp>
      {itemArray && itemArray.map((i) => (
        <File key={i.id} remove={remove} {...i}/>
      ))}
      <UploadForm fetch={fetchFromServer}/>
    </StyledApp>
  )
}


export default App
