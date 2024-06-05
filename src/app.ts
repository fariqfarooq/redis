import express from "express";

import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes';
const app = express();
const port = 4000

app.use(express.json());
app.use(express.urlencoded( ))
app.use('/users', userRoutes);






const mongoURI = 'mongodb://localhost:27017/ts-express-mongoose-redis';
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));  
  
app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
})
