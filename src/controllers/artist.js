const getDb = require('../services/db');

// creates an instance of artist
exports.createArtist = async (req, res) => {
    const db = await getDb();
    const { name, genre } = req.body;
  
    try {
      await db.query('INSERT INTO Artist (name, genre) VALUES (?, ?)', [
          name,
          genre,
      ]);
  
      res.sendStatus(201);
    } catch (err) {
      res.sendStatus(500).json(err);
    }
  
    db.close();
  };

// This function will read all artists and return them to the user
exports.readArtist = async (_, res) => {
  const db = await getDb();

  try {
    const [artists] = await db.query('SELECT * FROM Artist');

    res.status(200).json(artists);
  } catch (err) {
    res.status(500).json(err);
  }
  db.close();
};
