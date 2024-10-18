import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

const v1SiftApi = express.Router();
const v2SiftApi = express.Router();

// Define a route
v1SiftApi.get('/', (req: Request, res: Response) => {
  res.send('VERSION 1 SIFT API!');
});

// Retrieve a zipped folder for the assigment associated with {key} 
v1SiftApi.get('/assignment/:key', (req: Request, res: Response) => {
  res.send('Hello TypeScript with Express!');
});

// Add assignment information with the associated key 
v1SiftApi.post('/assignment/:key', (req: Request, res: Response) => {
  res.send('Hello TypeScript with Express!');
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

