const express = require('express');
const artistController = require('../controllers/artist');
// Require gives access to everything in ../controllers/artist
// Granting use of the create and read functions.

const router = express.Router();

router.post('/', artistController.createArtist);

router.get('/', artistController.readArtist);

module.exports = router;