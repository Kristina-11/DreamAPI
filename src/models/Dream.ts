import mongoose, { Schema } from 'mongoose';

const dreamSchema: Schema = new Schema({
  title: String,
  description: String,
  date: String,
  type: String
}, { timestamps: true });

const Dream = mongoose.model('Dream', dreamSchema);

module.exports = Dream;