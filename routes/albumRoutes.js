// routes/albumRoutes.js
const express = require('express');
const { getAllAlbums, createAlbum, updateAlbum, deleteAlbum } = require('../controllers/albumController');
const router = express.Router();

router.get('/', getAllAlbums);
router.post('/', createAlbum);
router.put('/:id', updateAlbum);
router.delete('/:id', deleteAlbum);

module.exports = router;
