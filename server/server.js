const express = require('express');
const sqlite3 = require('sqlite3');
const cors = require('cors');

const app = express();
const db = new sqlite3.Database(':memory:'); // Utilisez une base de données en mémoire pour cet exemple

app.use(cors()); // Activez les requêtes Cross-Origin

db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS people (id INTEGER PRIMARY KEY, name TEXT)');

  const stmt = db.prepare('INSERT INTO people (name) VALUES (?)');
  stmt.run('John Doe');
  stmt.run('Jane Doe');
  stmt.finalize();
});

app.get('/api/people', (req, res) => {
  db.all('SELECT * FROM people', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ people: rows });
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
