const express = require('express');
const artistRouter = require('./routes/artist');
const app = express();

app.use(express.json());

app.use('/artist', artistRouter);
// grab all artist.js file to handle endpoints that start with /artist
// use artistRouter for everything that starts with /artist
// POST a query to create instance of artist

app.get('/', (req, res) => {
    res.status(200).json({ result: 'Hello World!' });
});

module.exports = app;