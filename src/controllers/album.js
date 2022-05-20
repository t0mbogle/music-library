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
    await db.end();
};