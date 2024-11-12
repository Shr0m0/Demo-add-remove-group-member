//my task

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import groupRoutes from './routes/groupRoutes.js';  // Import group routes

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());  // Parse JSON bodies
app.use('/api', groupRoutes);  // Mount group routes under `/api`

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
