import { Request, Response, NextFunction } from 'express';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { enumDreamTypes } from './helpers/enumDreamTypes';
const dreamRoutes = require('./routes/dreamRoutes');

const app = express();
dotenv.config();

// Middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

// Connection to a db
const port: number | string = process.env.PORT || 3000;
const dbConnect: string = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}`;

mongoose.connect(dbConnect, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then((res) => {
  console.log('Connected to dreams');
  app.listen(port);
}).catch(err => {
  console.log(err);
})

// Getting dream types values in array
app.get('/dreamTypes', (req: Request, res: Response) => {
  console.log('dreaming sad or happy dreams?');
  let dreamTypesArr: string[] = [];
  
  for(let i in enumDreamTypes) {
    if(typeof enumDreamTypes[i] === 'number') {
      dreamTypesArr.push(i);
    }
  }

  res.send(dreamTypesArr);
});

// Routes
app.use('/dreams', dreamRoutes);