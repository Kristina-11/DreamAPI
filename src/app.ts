import { Request, Response, NextFunction } from 'express';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { dreamTypes } from './helpers/dreamTypes';

const app = express();
dotenv.config();

// Middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

// Connection to a db
const port: number | string = process.env.PORT || 8080;
const dbConnect: string = `mongodb+srv://${process.env.DB_CONNECTION}`;

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
app.get('/dreamTypes', (req: Request, res: Response) : void => {
  console.log('dreaming sad or happy dreams?');

  let dreamTypesArr: string[] = [];
  for(let i in dreamTypes) {
    if(typeof dreamTypes[i] === 'number') {
      dreamTypesArr.push(i);
    }
  }

  res.send(dreamTypesArr);
});