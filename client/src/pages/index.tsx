import axios from 'axios';
import React, { ChangeEvent, useState } from 'react';
import { operations } from '../../openapi/openapi';

type postTable = operations['post-table'];

axios.defaults.withCredentials = true;

const App: React.VFC = () => {
    const [file, setFile] = useState<File>();
    const [fileName, setFileName] = useState<string>();
    const [message, setMessage] = useState<string>('');

    const saveFile = (e: ChangeEvent<HTMLInputElement>) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };

    const uploadFile = async () => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', fileName);
        formData.append('tableName', 'TyHotelList');
        try {
            const res = await axios.post<postTable['responses']>(
                'http://localhost:3000/table',
                formData
            );
            setMessage(JSON.stringify(res.data));
            console.log(res.data);
        } catch (ex) {
            console.log(ex);
        }
    };

    return (
        <>
            <div className="App">
                <input type="file" onChange={saveFile} />
                <button onClick={uploadFile}>Upload</button>
            </div>
            {message && <p>{message}</p>}
        </>
    );
};

export default App;
