import { Request, Response } from 'express';
const Dream = require('../models/Dream');

// Methods for /dreams Get, Post and Delete
export const dreams_getAll = (req: Request, res: Response) => {
  Dream.find({})
    .then((data: unknown) => res.status(200).send(data))
    .catch((err: unknown) => res.status(500).send(err))
}

// Post a dream to a db
export const dreams_postAll = (req: Request, res: Response) => {
  const newDream = new Dream({
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
    type: req.body.type,
  });

  // Saving newDream to a db
  newDream.save()
    .then(() => {
      res.status(200).send('Succsessfully created a new dream :)');
    })
    .catch((err: unknown) => res.status(500).send(err));
}

// Deleting all dreams
export const dreams_deleteAll = (req: Request, res: Response) => {
  Dream.deleteMany({})
    .then(() => res.status(200).send('Deleted All Dreams'))
    .catch((err: unknown) => res.status(500).send(err));
}

// Methods for specific dream
// Getting one dream
export const dreams_get = (req: Request, res: Response) => {
  res.json('Getting one dream');
}


// Updating one dream
export const dreams_patch = (req: Request, res: Response) => {
  res.json('Updating one dream');
}

// Deleting one dream
export const dreams_delete = (req: Request, res: Response) => {
  res.json('Deleting one dream');
}