const express = require('express');
const moment = require('moment');
const Dream = require('./Dream');

const router = express.Router();

router.route('/')
  .get((req, res) => {
    // Pagination rules
    const page = req.query.page;
    const limit = req.query.limit;

    // Search options
    const type = req.query.type;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    // If search is not used getting all dreams else querying the options
    if (type === undefined) {
      Dream.find({})
      .then((data) => {
        res.json(data);
      })
      .catch(err => res.send(err));
    } else {
      Dream.find({
        type: {
          $regex: type,
          $options: '$i'
        }
      }).then((data) => {
        // Applying pagination
        if (page !== undefined && limit !== undefined) {
          let pageParsed = parseInt(page);
          let limitParsed = parseInt(limit);

          let results = {};
          let dataWithPagination = {};

          // Checking if we have more pages
          if (endIndex < data.length){
            dataWithPagination.next = {
              page: pageParsed + 1,
              limit: limitParsed
            }
          }

          // Checking if we reached first page
          if (startIndex > 0) {
            dataWithPagination.previous = {
              page: pageParsed - 1,
              limit: limitParsed
            }
          }

          dataWithPagination.results = data.slice(startIndex, endIndex);
          res.json(dataWithPagination);
        } else {     
          res.json(data);
        }
      })
    }
    
  })
  .post((req, res) => {
    const newDream = new Dream({
      title: req.body.title,
      description: req.body.description,
      date: moment().format('MM/DD/YYYY'),
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