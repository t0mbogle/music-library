const { expect } = require('chai');
const request = require('supertest');
const getDb = require('../src/services/db');
const app = require('../src/app');

describe('create album', () => {
    let db;
    let artist;
    
    beforeEach(async () => { 
        // There must be an artist before an album can be created
        db = await getDb();

        await db.query('INSERT INTO Artist (name, genre) VALUES (?, ?)', [
            'Tame Impala',
            'rock',
        ]);

        const [[artistEntries]] = await db.query(
            `SELECT * FROM Artist WHERE name = 'Tame Impala'`
        );
        artist = artistEntries.id;        
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
                    // artistId: 'Tom Misch',
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