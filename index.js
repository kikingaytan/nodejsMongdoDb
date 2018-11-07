const mongoose = require('mongoose');
const people = require('./routes/people');
const teams = require('./routes/teams');
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost:37017/soccer')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/people', people);
app.use('/api/teams', teams);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));