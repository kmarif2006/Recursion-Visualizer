import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import runCodeRouter from './routes/runCode.js';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const __dirname = path.resolve();

// Middleware
app.use(cors());  // Replace the existing CORS configuration with this simpler version

app.use(express.json());

// Routes
app.use('/api/run-code', runCodeRouter);
// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

