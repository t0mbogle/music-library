const { expect } = require('chai');
const request = require('supertest');
const getDb = require('../src/services/db');
const app = require('../src/app');

// There must be an artist before an album can be created
describe('create album', () => {
    let db;

    beforeEach(async () => { 
        db = await getDb();
        await db.query('INSERT INTO Artist (name, genre) VALUES (?, ?)', [
            'Tom Misch',
            'Soul',
        ]);
    });

    afterEach(async () => {
        await db.query('DELETE FROM Album');
        await db.end();
    });

    describe('/artist/:artistId/album', () => {
        describe('POST', () => {
            it('creates a new album in the database', async () => {
                const res = await request(app)
                .post('/album')
                .send({
                    name: 'Geography',
                    year: '2018',
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