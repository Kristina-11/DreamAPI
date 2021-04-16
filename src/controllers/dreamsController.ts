import { Request, Response } from 'express';
import logging from '../config/logging';
import { enumDreamTypes } from '../helpers/enumDreamTypes';
const Dream = require('../models/Dream');
const namespace = 'DreamsController'

// Methods for /dreams Get, Post and Delete
export const dreams_getAll = (req: Request, res: Response) => {
  Dream.find({})
    .then((data: unknown) => {
      res.status(200).send(data);
      logging.info(namespace, `Method: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    })
    .catch((err: unknown) => {
      res.status(500).send(err);
      logging.error(namespace, `Method: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`, err);
    });
}

// Post a dream to a db
export const dreams_postAll = (req: Request, res: Response) => {
  let typeIndex: number = 0;
  
  switch(req.body.type) {
    case 'happy':
       typeIndex = enumDreamTypes.happy;
      break;

    case 'sad':
       typeIndex = enumDreamTypes.sad;
      break;

    case 'exciting':
       typeIndex = enumDreamTypes.exciting;
      break;

    case 'scary':
       typeIndex = enumDreamTypes.scary;
      break;
  }

  const newDream = new Dream({
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
    type: typeIndex,
  });

  // Saving newDream to a db
  newDream.save()
    .then(() => {
      res.status(200).send('Succsessfully created a new dream :)');
      logging.info(namespace, `Method: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    })
    .catch((err: unknown) => {
      res.status(500).send(err);
      logging.error(namespace, `Method: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`, err);
    });
}

// Deleting all dreams
export const dreams_deleteAll = (req: Request, res: Response) => {
  Dream.deleteMany({})
    .then(() => {
      res.status(200).send('Deleted All Dreams');
      logging.info(namespace, `Method: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    })
    .catch((err: unknown) => {
      res.status(500).send(err);
      logging.error(namespace, `Method: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`, err);
    });
}

// Methods for specific dream
// Getting one dream
export const dreams_getOne = (req: Request, res: Response) => {
  const id: string = req.params.id;

  Dream.findOne({ _id: id })
    .then((data: unknown) => { 
      res.status(200).send(data); 
      logging.info(namespace, `Method: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    })
    .catch((err: unknown) => {
      res.status(500).send({message: 'Dream not found!', error: err});
      logging.error(namespace, `Method: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`, err);
    });
}


// Updating one dream
export const dreams_patchOne = (req: Request, res: Response) => {
  const id: string = req.params.id;

  Dream.updateOne({ _id: id }, { $set: req.body })
    .then((data: unknown) => { 
      res.status(200).send({data: data, message: 'Updated a dream'});
      logging.info(namespace, `Method: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`); 
    })
    .catch((err: unknown) => {
      res.status(500).send({message: 'Failed to update a dream!', error: err});
      logging.error(namespace, `Method: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`, err);
    });
}

// Deleting one dream
export const dreams_deleteOne = (req: Request, res: Response) => {
  const id: string = req.params.id;

  Dream.deleteOne({ _id: id })
    .then((data: unknown) => { 
      res.status(200).send({ data: data, message: 'Successfully deleted a dream!'});
      logging.info(namespace, `Method: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    })
    .catch((err: unknown) => {
      res.status(500).send({ message: 'Failed to delete a dream!', error: err });
      logging.error(namespace, `Method: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`, err);
    });
}