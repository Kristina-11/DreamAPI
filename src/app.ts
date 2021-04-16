import { Request, Response, NextFunction } from 'express';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import logging from './config/logging';

import { enumDreamTypes } from './helpers/enumDreamTypes';
const dreamRoutes = require('./routes/dreamRoutes');
const namespace = 'App';

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
  app.listen(port);
  logging.info(namespace, 'Connected to dreams');
}).catch(err => {
  logging.error(namespace, err.message, err);
})

// Getting dream types values in array
app.get('/dreamTypes', (req: Request, res: Response) => {
  logging.info(namespace, 'Dreaming happy dreams?');
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