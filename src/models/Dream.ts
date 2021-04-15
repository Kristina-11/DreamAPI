import mongoose from 'mongoose';

const dreamSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: String,
  type: Number,
  timestamp: String
});

const Dream = mongoose.model('Dream', dreamSchema);

module.exports = Dream;