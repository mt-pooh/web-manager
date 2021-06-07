import express from 'express';
import multer from 'multer';
import XLSX from 'xlsx';
import cors from 'cors';
import * as fs from 'fs';
import path from 'path';
import config from '../config.json';

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
    /* save tsv file */
    const tsvData = XLSX.utils.sheet_to_csv(wb.Sheets[wb.SheetNames[0]], {
        FS: '\t',
    });
    fs.writeFileSync(
        `${config.tsvSaveDir}/${path.parse(fileName).name}.tsv`,
        tsvData
    );
    console.log(tsvData);
    console.log(data);
};
const postFile = (req: express.Request, res: express.Response) => {
    loadData(req.file.filename);
    res.status(200).send('ok\n');
};

// app.get("/table", (_req, res) => {
//   res.json({
//     tableList: [{name: "test", type: "excel", displayName: "テスト"}]
//   });
// });

app.post('/table', uploader.single('file'), (req, res) => {
    console.log(`${req.file.originalname} is uploaded!!`);
    return postFile(req, res);
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
