const express = require('express');
const artistRouter = require('./routes/artist');
const albumRouter = require('./routes/album');
const app = express();

app.use(express.json());

app.use('/artist', artistRouter);
// grab all artist.js file to handle endpoints that start with /artist
// use artistRouter for everything that starts with /artist
// POST a query to create instance of artist
app.use('/album', albumRouter);

module.exports = app;