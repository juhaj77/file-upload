import React, { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { Progress } from 'reactstrap'


const FlexItem = styled.div`
  text-align: left; 
  width: 100%; 
  align-self: strech;
`
const Container2 = styled.div` 
  width: calc(9vw + 9vh); 
  max-width: 13.5em;
  overflow:hidden; 
  color: white; 
  display: flex; 
  border: 4px solid darkorange;
  flex-direction: column; 
  justify-content: space-between; 
  align-items: flex-start; 
  margin:1em 1em 1em 1em;
  background-color: darkblue;
  align-content: space-between; 
  flex-wrap: nowrap; 
  padding: .5em; 
  white-space: nowrap;
  text-overflow: ellipsis;
`
const FormHeader = styled.span`
  font-size: 1.2em; 
  line-height: 1em; 
  font-weight: 800; 
  padding: 0; 
  color: white;
`
const LabelStyle = styled.p`
  line-height: 1em; 
  margin: 0.2em 0 0.3em 0; 
  font-size: 1.2em;
  font-weight:bold; 
`

const UploadForm = ({ fetch }) => {
  const [loaded, setLoaded] = useState(0)
  const [selectedFile, setSelectedFile] = useState(null)

  const onChangeHandler = (event) => {
    const { files } = event.target
    if(files[0] && files[0].size < 50000000) {
      setLoaded(0)
      setSelectedFile(files[0])
    } else {
      console.log('File size too big!')
    }
  }

  const upload = async (payload) => {
    try {
      const res = await axios.post(`http://localhost:8001/api/add`, payload, {
        onUploadProgress: (ProgressEvent) => {
        // eslint-disable-next-line no-mixed-operators
          setLoaded(ProgressEvent.loaded / ProgressEvent.total * 100)
        },
      })
 
    } catch (e) {
     console.log(e)
    }
  }

  const onClickHandler = () => {
    const data = new FormData()
    data.append('file', selectedFile)
    data.append('lastModified', selectedFile.lastModified)
    upload(data).then(() => {
      setLoaded(0)
      setSelectedFile(null)
      document.getElementById('file').value = ''
      fetch()
    }).catch((e) => {
      console.log(e)
    })
  }

  return (
    <Container2>
      <FormHeader>
        UPLOAD FILE
      </FormHeader>
      <FlexItem>
        <LabelStyle>select file</LabelStyle>
        <input
            id='file'
            style={{ 
              textOverflow:'clip', 
              lineHeight: '1em', 
              fontSize: '1em', 
              margin: '0' }}
            type="file"
            name="upload_file"
            onChange={onChangeHandler}
        />
      </FlexItem>
      <FlexItem>
        <Progress max="100" color="success" value={loaded}>
          {Math.round(loaded, 2) }
          %
        </Progress>
        <button
          style={{
            fontSize: '1.2em', 
            fontWeight: 'bold', 
            padding:'.2em 1em .2em 1em',
          }}
          type="submit"
          onClick={onClickHandler}
        >
          submit
        </button>
      </FlexItem>
    </Container2>
  )
}

export default UploadForm
