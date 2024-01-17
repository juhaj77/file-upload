import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'

const Item = styled.div`
display: inline-block;
margin: 1em 1em 1em 1em;
padding: 1em 1em 1em 1em;
border: 1px solid white;
`
const File = (props) => {

  const [src, setSrc] = useState(null)
  const [loaded, setLoaded] = useState(0)

  const arrayBufferToBase64 = (buffer) => {
    let binary = ''
    const bytes = [].slice.call(new Uint8Array(buffer))
    // eslint-disable-next-line no-return-assign
    bytes.forEach((b) => binary += String.fromCharCode(b))
      return window.btoa(binary)
    }
    
  const fetchSrc = async (id) => {
      try {
        const res = await axios.get(`http://localhost:8001/api/get/${id}`)
        setSrc(`data:${res.data.file.contentType};`
        + `base64,${arrayBufferToBase64(res.data.file.data.data)}`)
      } catch (e) {
       console.log(e)
      }
      let link = document.createElement('a')
      link.download = props.name
      link.href = src
      link.click()
    }

  return <Item>{props.name}<br/>
    <button onClick={() => fetchSrc(props.id)}>download</button>
    <br/>
    <button onClick={() => props.remove(props.id)}>delete</button>
  </Item>
}

export default File