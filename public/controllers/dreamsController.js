"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dreams_deleteOne = exports.dreams_patchOne = exports.dreams_getOne = exports.dreams_deleteAll = exports.dreams_postAll = exports.dreams_getAll = void 0;
const Dream = require('../models/Dream');
// Methods for /dreams Get, Post and Delete
const dreams_getAll = (req, res) => {
    Dream.find({})
        .then((data) => res.status(200).send(data))
        .catch((err) => res.status(500).send(err));
};
exports.dreams_getAll = dreams_getAll;
// Post a dream to a db
const dreams_postAll = (req, res) => {
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
        .catch((err) => res.status(500).send(err));
};
exports.dreams_postAll = dreams_postAll;
// Deleting all dreams
const dreams_deleteAll = (req, res) => {
    Dream.deleteMany({})
        .then(() => res.status(200).send('Deleted All Dreams'))
        .catch((err) => res.status(500).send(err));
};
exports.dreams_deleteAll = dreams_deleteAll;
// Methods for specific dream
// Getting one dream
const dreams_getOne = (req, res) => {
    const id = req.params.id;
    Dream.findOne({ _id: id })
        .then((data) => { res.status(200).send(data); })
        .catch((err) => res.status(500).send({ message: 'Dream not found!', error: err }));
};
exports.dreams_getOne = dreams_getOne;
// Updating one dream
const dreams_patchOne = (req, res) => {
    const id = req.params.id;
    Dream.updateOne({ _id: id }, { $set: req.body })
        .then((data) => { res.status(200).send({ data: data, message: 'Updated a dream' }); })
        .catch((err) => res.status(500).send({ message: 'Failed to update a dream!', error: err }));
};
exports.dreams_patchOne = dreams_patchOne;
// Deleting one dream
const dreams_deleteOne = (req, res) => {
    const id = req.params.id;
    Dream.deleteOne({ _id: id })
        .then((data) => { res.status(200).send({ data: data, message: 'Successfully deleted a dream!' }); })
        .catch((err) => res.status(500).send({ message: 'Failed to delete a dream!', error: err }));
};
exports.dreams_deleteOne = dreams_deleteOne;
