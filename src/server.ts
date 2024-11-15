import express = require('express');
import mongoose = require('mongoose');
import gridfsStream = require('gridfs-stream');
import multer = require('multer');

const app = express();
const port = 3000;

const v1SiftApi = express.Router();
const v2SiftApi = express.Router();

const mongoURI = 'mongodb://localhost:27017/test';
const conn = mongoose.createConnection(mongoURI);

let gfs: gridfsStream.Grid | null = null;

conn.once('open', () => {
  gfs = gridfsStream(conn.db, mongoose.mongo);
  gfs.collection('uploads');
  console.log('Connection to MongoDB is successful!');
});

// Create a storage object with a given configuration
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Define a route
v1SiftApi.get('/', (req: express.Request, res: express.Response) => {
  res.send('VERSION 1 SIFT API!');
});

// Retrieve a zipped folder for the assignment associated with {key}
v1SiftApi.get('/assignment/:key', (req: express.Request, res: express.Response) => {
  res.send('Hello TypeScript with Express!');
});

// Add assignment information with the associated key
v1SiftApi.post(
  '/assignment/:key',
  upload.single('file'),
  (req: express.Request, res: express.Response) => {
    if (!req.file || !gfs) {
      res.status(400).send('No file uploaded!');
      return;
    }

    const uploadStream = gfs.createWriteStream({
      filename: req.file.originalname,
      content_type: req.file.mimetype,
    });
    uploadStream.end(req.file.buffer);

    uploadStream.on('finish', (file) => {
      res.send(`File uploaded successfully: ${file.filename}`);
    });

    uploadStream.on('error', (error) => {
      res.status(500).send('Error uploading file!');
    });
  }
);

v1SiftApi.put('/assignment/:key', (req: express.Request, res: express.Response) => {
  res.send('Hello TypeScript with Express!');
});

v1SiftApi.get('/time/Islamabad', (req: express.Request, res: express.Response) => {
  // Get the current time in Islamabad
  const date = new Date();
  const options = { timeZone: 'Asia/Karachi', hour12: false };
  const time = date.toLocaleTimeString('en-US', options);
  res.send(`Current time in Islamabad: ${time}`);
});

// Delete the assignment information associated with {key}
v1SiftApi.delete('/assignment/:key', (req: express.Request, res: express.Response) => {
  res.send('Hello TypeScript with Express!');
});

v2SiftApi.get('/', (req: express.Request, res: express.Response) => {
  res.send('VERSION 2 SIFT API!');
});

app.use('/v1', v1SiftApi);
app.use('/v2', v2SiftApi);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
