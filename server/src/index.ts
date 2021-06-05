import express from 'express';
import multer from 'multer';

const app = express();
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: false }));

const port = 3000
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (_req, file, cb) => {
    cb(null, file.originalname)
  }
})
const uploader = multer({ storage })

app.get("/table", (_req, res) => {
  res.json({
    tableList: [{name: "test", type: "excel", displayName: "テスト"}]
  });
});

app.post("/table", uploader.single("file"), (req, res) => {
  const response = {
    content: {
      "application/json": {
        status: "OK"
      }
    }
  }
  res.send(response)
  console.log(`${req.file.originalname} is uploaded!!`)
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
