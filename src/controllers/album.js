const getDb = require('../services/db');

// creates an instance of an album 
exports.createAlbum = async (req, res) => {
    const db = await getDb();
    const { name, year, artistId } = req.body;

    try {
        await db.query(`INSERT INTO Album (name, year, artistId) VALUES (?, ?, ?)`, [
            name,
            year,     
            artistId   
        ]);

        res.sendStatus(201);
    } catch (err) {
        res.sendStatus(500);
    }
    db.close();
};

// Reads all albums and returns them to the user
exports.readAlbum = async (_, res) => {
    const db = await getDb();

    try {
        const [album] = await db.query('SELECT * FROM Album');

        res.status(200).json(album);
    } catch (err) {
        res.status(500).json(err);
    }
    db.close();
};