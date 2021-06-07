import axios from 'axios';
import React, { ChangeEvent, useState } from 'react';
import { operations } from '../../openapi/openapi';

type postTable = operations['post-table'];

axios.defaults.withCredentials = true;

const App: React.VFC = () => {
    const [file, setFile] = useState<File>();
    const [fileName, setFileName] = useState<string>();

    const saveFile = (e: ChangeEvent<HTMLInputElement>) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };

    const uploadFile = async () => {
        // const requestBody: postTable['requestBody'] = {
        //     content: {
        //         'multipart/form-data': {
        //             date: String(new Date()),
        //             fileName: fileName,
        //             tableName: 'TyHotelList',
        //         },
        //     },
        // };
        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', fileName);
        formData.append('tableName', 'TyHotelList');
        try {
            const res = await axios.post<postTable['responses']>(
                'http://localhost:3000/table',
                formData
            );
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
        </>
    );
};

export default App;
