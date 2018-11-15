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
//expone el folder que se usa para exponer los archivos que se guardan
//image upload 
//https://www.youtube.com/watch?v=srPXMt1Q0nY
app.use(express.static('uploads'));
//app.use('/uploads',express.static('uploads'));
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));