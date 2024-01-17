import React from 'react'
import styled from 'styled-components'
import axios from 'axios'

const Item = styled.div`
display: inline-block;
margin: 1em 1em 1em 1em;
padding: 1em 1em 1em 1em;
border: 1px solid white;
`

const File = (props) => {

  const arrayBufferToBase64 = (buffer) => {
    let binary = ''
    const bytes = [].slice.call(new Uint8Array(buffer))
    // eslint-disable-next-line no-return-assign
    bytes.forEach((b) => binary += String.fromCharCode(b))
      return window.btoa(binary)
    }
    
  const fetchSrc = async (id) => {
    const link = document.getElementById(props.id)
    try {
      const res = await axios.get(`http://localhost:8001/api/get/${id}`)
      link.href = `data:${res.data.file.contentType};`
        + `base64,${arrayBufferToBase64(res.data.file.data.data)}`
    } catch (e) {
      console.log(e)
    }
    link.download = props.name
    link.click()
    }

  return <Item>{props.name}<br/>
    <button onClick={() => fetchSrc(props.id)}>download</button>
    <a id={props.id}/>
    <br/>
    <button onClick={() => props.remove(props.id)}>delete</button>
  </Item>
}

export default File