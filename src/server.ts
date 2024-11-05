import express, { Request, Response } from 'express';
import mongoose, { Connection } from 'mongoose';
import multer from 'multer';
import gridfsStram from 'gridfs-stream';

const app = express();
const port = 3000;

const v1SiftApi = express.Router();
const v2SiftApi = express.Router();

const mongoURI = 'mongodb://localhost:27017/test';
const conn: Connection = mongoose.createConnection(mongoURI);

let gfs: gridfsStram.Grid | null = null;

conn.once('open', () => {
  gfs = gridfsStram(conn.db, mongoose.mongo);
  gfs.collection('uploads');
  console.log('Connection to MongoDB is successful!');
});

// Create a storage object with a given configuration
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Define a route
v1SiftApi.get('/', (req: Request, res: Response) => {
  res.send('VERSION 1 SIFT API!');
});

// Retrieve a zipped folder for the assigment associated with {key} 
v1SiftApi.get('/assignment/:key', (req: Request, res: Response) => {
  res.send('Hello TypeScript with Express!');
});

// Add assignment information with the associated key 
v1SiftApi.post('/assignment/:key', upload.single('file'), (req: Request, res: Response) => {
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

});

v1SiftApi.put('/assignment/:key', (req: Request, res: Response) => {
  res.send('Hello TypeScript with Express!');
});

// Delete the assignment information associated with {key}
v1SiftApi.delete('/assignment/:key', (req: Request, res: Response) => {
  res.send('Hello TypeScript with Express!');
});

v2SiftApi.get('/', (req: Request, res: Response) => {
  res.send('VERSION 2 SIFT API!');
});

app.use('/v1', v1SiftApi);
app.use('/v2', v2SiftApi);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

