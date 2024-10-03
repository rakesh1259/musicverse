// routes/artistRoutes.js
const express = require('express');
const { getAllArtists, createArtist, updateArtist, deleteArtist } = require('../controllers/artistController');
const router = express.Router();

router.get('/', getAllArtists);
router.post('/', createArtist);
router.put('/:id', updateArtist);
router.delete('/:id', deleteArtist);

module.exports = router;
