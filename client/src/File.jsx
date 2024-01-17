import React from 'react'
import styled from 'styled-components'

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
    
      const src = `data:${props.file.contentType};`
      + `base64,${arrayBufferToBase64(props.file.data.data)}`


        return <Item>download link:<br/>
            <a download={props.name} href={src}>{props.name}</a><br/>
            <button onClick={() => props.remove(props.id)}>delete</button>
        </Item>
}

export default File