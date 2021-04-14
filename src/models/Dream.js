const mongoose = require('mongoose');

const dreamSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: String, 
  type: String
});

const Dream = mongoose.model('Dream', dreamSchema);

module.exports = Dream;
