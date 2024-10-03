// models/artist.js
const db = require('../config/db');

const Artist = {
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM artists');
    return rows;
  },
  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM artists WHERE id = ?', [id]);
    return rows[0];
  },
  create: async (name, genre, image_url) => {
    const [result] = await db.query('INSERT INTO artists (name, genre, image_url) VALUES (?, ?, ?)', [name, genre, image_url]);
    return result.insertId;
  },
  update: async (id, name, genre, image_url) => {
    await db.query('UPDATE artists SET name = ?, genre = ?, image_url = ? WHERE id = ?', [name, genre, image_url, id]);
  },
  delete: async (id) => {
    await db.query('DELETE FROM artists WHERE id = ?', [id]);
  }
};

module.exports = Artist;
