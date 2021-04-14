const express = require('express');
const mongoose = require('mongoose');
const arrayOfDreamTypes = require('./helpers/dreamTypes');
const dreamRoutes = require('./routes/dreamRoutes');

const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

// Connection to a db
const dbConnect = 'mongodb+srv://test:test12345@clusterfirst.2gqqe.mongodb.net/dream-api';
mongoose.connect(dbConnect, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then((res) => {
  console.log('Connected to dreams');
  app.listen(3000);
}).catch(err => {
  console.log(err);
})

// Getting all dream types
app.get('/dreamTypes', (req, res) => {
  console.log('dreaming sad or happy dreams?');
  res.json(arrayOfDreamTypes);
});

// Routes
app.use('/dreams',dreamRoutes);
