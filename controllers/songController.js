// controllers/songController.js
const Song = require("../models/song");
const path = require("path");
const multer = require("multer"); // Import multer

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/songs'); // Directory where files will be stored
  },
  filename: (req, file, cb) => {
    // Generate a unique name for the file
    const uniqueName = Date.now() + path.extname(file.originalname); // e.g., 1634072800000.mp3
    cb(null, uniqueName);
  }
});

// Middleware for handling file uploads
const upload = multer({ storage });

// Controller for creating a song
const createSong = async (req, res) => {
  const { album_id, title } = req.body; // Removed duration and track_number
  const file = req.file; // Get the uploaded file

  // Check if file is uploaded
  if (!file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  try {
    // Generate the relative file path for the stored file
    const filePath = path.join('uploads/songs', file.filename); // e.g., uploads/songs/unique-name.mp3

    // Create a new song in the database
    const newSongId = await Song.create(album_id, title, filePath);
    res.status(201).json({ id: newSongId, title, filePath }); // Return the ID and file path
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Error creating song' });
  }
};

const getAllSongs = async (req, res) => {
  try {
    const songs = await Song.getAll();
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching songs" });
  }
};

const updateSong = async (req, res) => {
  const { id } = req.params;
  const { album_id, title, duration, track_number } = req.body;
  try {
    await Song.update(id, album_id, title, duration, track_number);
    res.status(200).json({ message: "Song updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating song" });
  }
};

const deleteSong = async (req, res) => {
  const { id } = req.params;
  try {
    await Song.delete(id);
    res.status(200).json({ message: "Song deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting song" });
  }
};

module.exports = { getAllSongs, createSong, updateSong, deleteSong, upload };
