import axios from 'axios';
import React, { ChangeEvent, useState } from 'react';
import { operations } from '../../openapi/openapi';
import { VerticalTabs } from '../components/TabPanel';
import TypeSchema from '../../schema/TypeSchema.json';

type postTable = operations['post-table'];

axios.defaults.withCredentials = true;

const App: React.VFC = () => {
    const [file, setFile] = useState<File>();
    const [fileName, setFileName] = useState<string>();
    const [message, setMessage] = useState<string>('');
    const [submittedItem, setSubmittedItem] = useState<string>();

    const saveFile = (e: ChangeEvent<HTMLInputElement>) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };

    const uploadFile = async () => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', fileName);
        formData.append('tableName', submittedItem);
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
        <VerticalTabs
            dataList={Object.keys(TypeSchema.properties)}
            selectedItem={submittedItem}
            onClick={(index) => {
                setSubmittedItem(Object.keys(TypeSchema.properties)[index]);
                setMessage('');
            }}
        >
            <div className="App">
                <p>{submittedItem}</p>
                <input type="file" onChange={saveFile} />
                <button onClick={uploadFile}>Upload</button>
            </div>
            {message && <p>{message}</p>}
        </VerticalTabs>
    );
};

export default App;
