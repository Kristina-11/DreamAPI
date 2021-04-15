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
export const dreams_getOne = (req: Request, res: Response) => {
  const id: string = req.params.id;

  Dream.findOne({ _id: id })
    .then((data: unknown) => { res.status(200).send(data); })
    .catch((err: unknown) => res.status(500).send({message: 'Dream not found!', error: err}));
}


// Updating one dream
export const dreams_patchOne = (req: Request, res: Response) => {
  const id: string = req.params.id;

  Dream.updateOne({ _id: id }, { $set: req.body })
    .then((data: unknown) => { res.status(200).send({data: data, message: 'Updated a dream'}) })
    .catch((err: unknown) => res.status(500).send({message: 'Failed to update a dream!', error: err}));
}

// Deleting one dream
export const dreams_deleteOne = (req: Request, res: Response) => {
  res.json('Deleting one dream');
}