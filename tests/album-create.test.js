const { expect } = require('chai');
const request = require('supertest');
const getDb = require('../src/services/db');
const app = require('../src/app');

describe('create album', () => {
    let db;
    // let artist;

    // There must be an artist before an album can be created
    beforeEach(async () => { 
        db = await getDb();
        await db.query('INSERT INTO Artist (name, genre) VALUES (?, ?)', [
            'Tom Misch',
            'Soul',
        ]);

        // const [[artistEntries]] = await db.query(
        //     `SELECT * FROM Artist WHERE name = 'Tom Misch'`
        // );
        // Before each test assign the Artists info to artistEntries

        // [artist] = artistEntries.name;

        // Reference artistEntries to retrieve artistId
        // so this info is available in the POST request...
    });

    afterEach(async () => {
        await db.query('DELETE FROM Album');
        await db.close();
    });

    describe('/artist/:artistId/album', () => {
        describe('POST', () => {
            it('creates a new album in the database', async () => {
                const res = await request(app).post('/album').send({
                    name: 'Geography',
                    year: '2018',
                    artistId: artist,
                });

                expect(res.status).to.equal(201);
                // something is being created, so 201
                const [[albumEntries]] = await db.query(
                    `SELECT * FROM Album WHERE name = 'Geography'`
                );

                expect(albumEntries.name).to.equal('Geography');
                expect(albumEntries.year).to.equal(2018);
            });
        });
    });
});