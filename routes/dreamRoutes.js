const express = require('express');
const moment = require('moment');
const Dream = require('../models/Dream');

const router = express.Router();

router.route('/')
  .get((req, res) => {
    Dream.find({})
    .then((data) => {
      res.json(data);
    })
    .catch(err => res.send(err));
  })
  .post((req, res) => {
    const newDream = new Dream({
      title: req.body.title,
      description: req.body.description,
      date: moment().format('MM DD YYYY'),
      type: req.body.type
    });
    
    newDream.save()
    .then(() => {
      res.send('Succsessfully created a new dream :)');
    })
    .catch(err => res.send(err));
  })
  .delete((req, res) => {
    Dream.deleteMany({})
    .then(() => {
      res.send('Deleted every dream!');
    })
    .catch(err => res.send(err));
  });

  router.route('/:id')
    .get((req, res) => {
      const id = req.params.id;
      Dream.findOne(
        { _id: id },
        (err, data) => {
          if (!err) {
            if (data !== null) {
              return res.json(data);
            } else {
              return res.send('Dream not found!');
            }
          } else {
            res.send(err);
          }
        }
      );
    })
    .patch((req, res) => {
      const id = req.params.id;
      Dream.updateOne(
        { _id: id },
        { $set: req.body },
        (err) => {
          if (!err) {
            res.send('Updated a dream!');
          } else {
            res.send(err);
          }
        }
      )
    })
    .delete((req, res) => {
      const id = req.params.id;
      Dream.deleteOne(
        { _id: id },
        (err) => {
          if (!err) {
            res.send('Deleted a specific dream!');
          } else {
            res.send(err)
          }
        }
      );
    });


  module.exports = router;