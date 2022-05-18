import express from 'express';
import multer from 'multer';
import XLSX from 'xlsx';
import cors from 'cors';
import * as fs from 'fs';
import path from 'path';
import config from '../config.json';
import validateJson from './validate';
import TypeSchema from '../schema/TypeSchema.json';
import { operations } from '../openapi/openapi';

interface StringKeyObject {
    // 今回はstring
    [key: string]: any;
}
const app = express();
app.use(express.json());
app.use(express.text());
app.use(cors({ origin: true, credentials: true }));
app.use(express.urlencoded({ extended: false }));

// mkdir if doesn't exist
if (!fs.existsSync(config.uploadDir)) {
    fs.mkdirSync(config.uploadDir);
}
if (!fs.existsSync(config.tsvSaveDir)) {
    fs.mkdirSync(config.tsvSaveDir);
}

const port = 3000;
const storage = multer.diskStorage({
    destination: config.uploadDir,
    filename: (_req, file, cb) => {
        cb(null, file.originalname);
    },
});
const uploader = multer({ storage });

const loadData = (fileName: string) => {
    const wb = XLSX.readFile(fileName);
    /* generate array of arrays */
    const data = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
    return data;
};

const saveTsvData = (fileName: string) => {
    const wb = XLSX.readFile(fileName);
    /* save tsv file */
    const tsvData = XLSX.utils.sheet_to_csv(wb.Sheets[wb.SheetNames[0]], {
        FS: '\t',
    });
    fs.writeFileSync(
        `${config.tsvSaveDir}/${path.parse(fileName).name}.tsv`,
        tsvData
    );
};
const postFile = (
    req: express.Request<
        {},
        {},
        operations['post-table']['requestBody']['content']['multipart/form-data']
    >,
    res: express.Response // TODO: 型をきちんと付ける
) => {
    if (!req.file) {
        res.status(400).send('file is None');
        return;
    }
    const jsonData = loadData(path.join(config.uploadDir, req.file.filename));
    const schema: StringKeyObject = TypeSchema.properties;
    const errors = validateJson(jsonData, schema[req.body.tableName]);
    if (errors) {
        res.status(200).send(errors);
        return;
    }
    console.log('valid!!');
    saveTsvData(path.join(config.uploadDir, req.file.filename));
    res.status(200).send('OK');
};

app.post('/table', uploader.single('file'), (req, res) => {
    if (!req.file) {
        console.log('file is None');
    } else {
        console.log(`${req.file.originalname} is uploaded!!`);
    }
    return postFile(req, res);
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
