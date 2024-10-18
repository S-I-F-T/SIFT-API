import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

// Define a route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello TypeScript with Express!');
});

// Retrieve a zipped folder for the assigment associated with {key} 
app.get('/assignment/{key}', (req: Request, res: Response) => {
  res.send('Hello TypeScript with Express!');
});

// Add assignment information with the associated key 
app.post('/assignment/{key}', (req: Request, res: Response) => {
  res.send('Hello TypeScript with Express!');
});

app.put('/assignment/{key}', (req: Request, res: Response) => {
  res.send('Hello TypeScript with Express!');
});

// Delete the assignment information associated with {key}
app.delete('/assignment/{key}', (req: Request, res: Response) => {
  res.send('Hello TypeScript with Express!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

