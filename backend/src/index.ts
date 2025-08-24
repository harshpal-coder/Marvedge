import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './db';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());



import authRoutes from './routes/auth';
import toursRoutes from './routes/tours';
app.use('/api/auth', authRoutes);
app.use('/api/tours', toursRoutes);

app.get('/', (req, res) => {
  res.send('Marvedge Backend API');
});

const PORT = process.env.PORT || 4000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
