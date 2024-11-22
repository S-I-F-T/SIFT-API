import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import { GridFSBucket } from 'mongodb';

const app = express();
const port = 3000;

const v1SiftApi = express.Router();
const v2SiftApi = express.Router();

const mongoURI = 'mongodb://localhost:27017/test';
const conn = mongoose.createConnection(mongoURI);

let gfsBucket: GridFSBucket | null = null;

conn.once('open', () => {
  gfsBucket = new GridFSBucket(conn.db as any, { bucketName: 'uploads' });
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
v1SiftApi.get('/assignment/:key', (req, res) => {
  const fileId = req.params.key;

  if (!gfsBucket) {
    res.status(500).send('GridFSBucket not initialized!');
    return;
  }

  try {
    const downloadStream = gfsBucket.openDownloadStream(new mongoose.Types.ObjectId(fileId));

    downloadStream.on('data', (chunk) => res.write(chunk));
    downloadStream.on('end', () => res.end());
    downloadStream.on('error', (err) => {
      console.error(err);
      res.status(404).send('File not found!');
    });
  } catch (err) {
    res.status(400).send('Invalid file ID!');
  }
});

// Add assignment information with the associated key
v1SiftApi.post('/assignment/:key', upload.single('file'), (req, res) => {
  if (!req.file || !gfsBucket) {
    res.status(400).send('No file uploaded or GridFSBucket not initialized!');
    return;
  }

  const uploadStream = gfsBucket.openUploadStream(req.file.originalname, {
    contentType: req.file.mimetype,
  });
  uploadStream.end(req.file.buffer);

  uploadStream.on('finish', (file) => {
    res.send(`File uploaded successfully with ID: ${file._id}`);
  });

  uploadStream.on('error', (err) => {
    console.error(err);
    res.status(500).send('Error uploading file!');
  });
});

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
