// controllers/albumController.js
const Album = require('../models/album');

const getAllAlbums = async (req, res) => {
  try {
    const albums = await Album.getAll();
    res.status(200).json(albums);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching albums' });
  }
};

const createAlbum = async (req, res) => {
  const { artist_id, title, release_year, cover_url } = req.body;
  try {
    const newAlbumId = await Album.create(artist_id, title, release_year, cover_url);
    res.status(201).json({ id: newAlbumId, title, release_year, cover_url });
  } catch (error) {
    res.status(500).json({ message: 'Error creating album' });
  }
};

const updateAlbum = async (req, res) => {
  const { id } = req.params;
  const { artist_id, title, release_year, cover_url } = req.body;
  try {
    await Album.update(id, artist_id, title, release_year, cover_url);
    res.status(200).json({ message: 'Album updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating album' });
  }
};

const deleteAlbum = async (req, res) => {
  const { id } = req.params;
  try {
    await Album.delete(id);
    res.status(200).json({ message: 'Album deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting album' });
  }
};

module.exports = { getAllAlbums, createAlbum, updateAlbum, deleteAlbum };
