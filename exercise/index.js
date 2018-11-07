const mongoose = require('mongoose');
//const addresses = require('./routes/addresses');
//const people = require('./routes/people');
const teams = require('./routes/teams');
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost:37017/soccer')
    .then(  () => console.log('connected to mongo db'))
    .catch(err => console.log('error ',err));

app.use(express.json());
//app.use('/api/addresses', addresses);
app.use('/api/teams', teams);
//app.use('/api/people', people);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));