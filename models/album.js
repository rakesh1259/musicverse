// models/album.js
const db = require('../config/db');

const Album = {
  getAll: async () => {
    const [rows] = await db.query('SELECT albums.*, artists.name as artist_name, artists.image_url as artist_pic FROM albums JOIN artists ON albums.artist_id = artists.id');
    return rows;
  },
  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM albums WHERE id = ?', [id]);
    return rows[0];
  },
  create: async (artist_id, title, release_year, cover_url) => {
    const [result] = await db.query('INSERT INTO albums (artist_id, title, release_year, cover_url) VALUES (?, ?, ?, ?)', [artist_id, title, release_year, cover_url]);
    return result.insertId;
  },
  update: async (id, artist_id, title, release_year, cover_url) => {
    await db.query('UPDATE albums SET artist_id = ?, title = ?, release_year = ?, cover_url = ? WHERE id = ?', [artist_id, title, release_year, cover_url, id]);
  },
  delete: async (id) => {
    await db.query('DELETE FROM albums WHERE id = ?', [id]);
  }
};

module.exports = Album;
