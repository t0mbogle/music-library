const express = require('express');
const artistController = require('../controllers/artist');
// Require gives access to everything in ../controllers/artist
// Granting use of the create and read functions.

const router = express.Router();

// Create an artist
router.post('/', artistController.createArtist);
// Read all artists
router.get('/', artistController.readArtist);
// Read one artist, by a specific artistId
router.get('/:artistId', artistController.readById);
// Updates the details of an artist via name and/or genre
router.patch('/:artistId', artistController.updateArtist);
// Deletes an artist from the database
router.delete('/:artistId', artistController.deleteArtist);


module.exports = router;