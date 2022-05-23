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

// Returns a specific artist
exports.readById = async (req, res) => {
  const db = await getDb();
  const { artistId } = req.params;

  const [[artist]] = await db.query('SELECT * FROM Artist WHERE id = ?', [
    artistId,
  ]);

  if (!artist) {
    res.sendStatus(404);
  } else {
    res.status(200).json(artist);
  }
  // This cecks if the artistId is there or not(truthy/falsy)
  await db.end();
};

exports.updateArtist = async (req, res) => {
  const db = await getDb();
  const data = req.body;
  const { artistId } = req.params;

  try {
    const [
      { affectedRows }, 
    ] = await db.query('UPDATE Artist SET ? WHERE id = ?', [data, artistId]);

  // If something in the patch request is not changed 
    if (!affectedRows) {
      res.sendStatus(404);
    } else {
      res.status(200).send();
    }
  } catch (err) {
    res.status(500).json(err);
  }
  
  await db.end();
};

// Deletes an artists records from the database
exports.deleteArtist = async (req, res) => {
  const db = await getDb();
  const { artistId } = req.params;

  try {
    const [{ affectedRows }] = await db.query('DELETE FROM Artist WHERE id = ?', [artistId]);

    if(!affectedRows) {
      res.sendStatus(404) 
    } else {
      res.sendStatus(200);
    }
  } catch (err) {
    res.sendStatus(500);
  }

  db.close();
};