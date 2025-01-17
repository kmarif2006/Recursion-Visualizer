import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import runCodeRouter from './routes/runCode.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// Routes
app.use('/api/run-code', runCodeRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

