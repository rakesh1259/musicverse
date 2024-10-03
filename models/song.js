// models/song.js
const db = require("../config/db");

const Song = {
  getAll: async () => {
    const [rows] = await db.query(`
      SELECT songs.*, albums.title as album_title, albums.cover_url as album_img, artists.name as artist_name, artists.image_url as artist_pic
      FROM songs 
      JOIN albums ON songs.album_id = albums.id 
      JOIN artists ON albums.artist_id = artists.id
    `);
    return rows;
  },
  getById: async (id) => {
    const [rows] = await db.query(
      `
      SELECT songs.*, albums.title as album_title, artists.name as artist_name 
      FROM songs 
      JOIN albums ON songs.album_id = albums.id 
      JOIN artists ON albums.artist_id = artists.id 
      WHERE songs.id = ?`,
      [id]
    );
    return rows[0];
  },
  create: async (album_id, title, file_path) => {
    const [result] = await db.query(
      "INSERT INTO songs (album_id, title, file_path) VALUES (?, ?, ?)",
      [album_id, title, file_path]
    );
    return result.insertId;
  },

  update: async (id, album_id, title, duration, track_number) => {
    await db.query(
      "UPDATE songs SET album_id = ?, title = ?, duration = ?, track_number = ? WHERE id = ?",
      [album_id, title, duration, track_number, id]
    );
  },
  delete: async (id) => {
    await db.query("DELETE FROM songs WHERE id = ?", [id]);
  },
};

module.exports = Song;
