const db = require('../services/db');
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

// Reads all albums and returns them to the user
exports.readAlbum = async (_, res) => {
    const db = await getDb();

    try {
        const [albums] = await db.query('SELECT * FROM Album');

        res.status(200).json(albums);
    } catch (err) {
        res.status(500).json(err);
    }
    await db.end();
};

// Reads a specific album by id
exports.readByAlbumId = async (req, res) => {
    const db = await getDb();
    const { albumId } = req.params;

    const [[album]] = await db.query('SELECT * FROM Album WHERE id = ?', [
        albumId,
    ]);

    if(!album) {
        res.sendStatus(404);
    } else {
        res.status(200).json(album);
    }
    await db.end();
    // db.end because the promise needs to be closed.
};

// Updates an album
exports.updateAlbum = async (req, res) => {
    const db = await getDb();
    const data = req.body;
    const { albumId } = req.params;

    try {
        const [
            { affectedRows },
        ] = await db.query('UPDATE Album SET ? WHERE id = ?', [data, albumId]);

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

// Deletes an album from the database
exports.deleteAlbum = async (req, res) => {
    const db = await getDb();
    const { albumId } = req.params;

    try {
        const [{ affectedRows }] = await db.query('DELETE FROM Album WHERE id = ?', [albumId]);

        if(!affectedRows) {
            res.sendStatus(404);
        } else {
            res.sendStatus(200);
        }
    } catch (err) {
        res.sendStatus(500);
    }
    await db.end();
};