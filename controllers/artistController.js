// controllers/artistController.js
const Artist = require('../models/artist');

const getAllArtists = async (req, res) => {
  try {
    const artists = await Artist.getAll();
    res.status(200).json(artists);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching artists' });
  }
};

const createArtist = async (req, res) => {
  const { name, genre, image_url } = req.body;
  try {
    const newArtistId = await Artist.create(name, genre, image_url);
    res.status(201).json({ id: newArtistId, name, genre, image_url });
  } catch (error) {
    res.status(500).json({ message: 'Error creating artist' });
  }
};

const updateArtist = async (req, res) => {
  const { id } = req.params;
  const { name, genre, image_url } = req.body;
  try {
    await Artist.update(id, name, genre, image_url);
    res.status(200).json({ message: 'Artist updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating artist' });
  }
};

const deleteArtist = async (req, res) => {
  const { id } = req.params;
  try {
    await Artist.delete(id);
    res.status(200).json({ message: 'Artist deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting artist' });
  }
};

module.exports = { getAllArtists, createArtist, updateArtist, deleteArtist };
