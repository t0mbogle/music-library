const express = require('express');
const albumController = require('../controllers/album');
// require the controllers so that they can be referenced in the routes

const router = express.Router();

// Creates an album
router.post('/', albumController.createAlbum);
// Read all albums
router.get('/', albumController.readAlbum);
// Read one album, by a specific albumId
router.get('/:albumId', albumController.readByAlbumId);

module.exports = router;