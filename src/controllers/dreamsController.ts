import { Request, Response } from 'express';
import moment from 'moment';
const Dream = require('../models/Dream');
const enumDreamTypes = require('../helpers/enumDreamTypes');

// Methods for /dreams Get, Post and Delete
export const dreams_getAll = (req: Request, res: Response) => {
  res.json('Getting all dreams');
}

// Post a dream to a db
export const dreams_postAll = (req: Request, res: Response) => {
  const newDream = new Dream({
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
    type: req.body.type,
    timestamp: moment().format('MM/DD/YYYY')
  });

  // Saving newDream to a db
  newDream.save()
    .then(() => {
      res.send('Succsessfully created a new dream :)');
    })
    .catch((err: unknown) => res.send(err));
}

export const dreams_deleteAll = (req: Request, res: Response) => {
  res.json('Deleting all dreams');
}

// Methods for specific dream
export const dreams_get = (req: Request, res: Response) => {
  res.json('Getting one dream');
}

export const dreams_patch = (req: Request, res: Response) => {
  res.json('Updating one dream');
}

export const dreams_delete = (req: Request, res: Response) => {
  res.json('Deleting one dream');
}