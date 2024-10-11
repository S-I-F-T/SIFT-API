import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

// Define a route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello TypeScript with Express!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
