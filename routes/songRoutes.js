// routes/songRoutes.js
const express = require('express');
const { getAllSongs, createSong, updateSong, deleteSong, upload } = require('../controllers/songController');
const router = express.Router();

router.get('/', getAllSongs);
router.post('/', upload.single('audio'), createSong);
router.put('/:id', updateSong);
router.delete('/:id', deleteSong);

module.exports = router;
