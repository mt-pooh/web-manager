import axios from 'axios'
import React, { ChangeEvent, useState } from 'react'

axios.defaults.withCredentials = true

const App: React.VFC = () => {
  const [file, setFile] = useState<File>()
  const [fileName, setFileName] = useState<string>()
  const [status, setStatus] = useState<number>()

  const saveFile = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files[0])
    setFileName(e.target.files[0].name)
  }

  const uploadFile = async () => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('fileName', fileName)
    try {
      const res = await axios.post('http://localhost:3000/table', formData)
      setStatus(res.status)
      console.log(res)
    } catch (ex) {
      console.log(ex)
    }
  }

  return (
    <>
      <div className="App">
        <input type="file" onChange={saveFile} />
        <button onClick={uploadFile}>Upload</button>
      </div>
      {status && <p>{status === 200 ? 'OK' : 'NG'}</p>}
    </>
  )
}

export default App
