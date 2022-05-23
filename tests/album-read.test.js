const { expect } = require('chai');
const request = require('supertest');
const getDb = require('../src/services/db');
const app = require('../src/app');

describe('read album', () => {
    let db;
    let artists;
    let albums;
    // outside of before and afterEach so they have the same scope

    beforeEach(async () => {
        db = await getDb();
        await Promise.all([
            db.query('INSERT INTO Artist (name, genre) VALUES(?, ?)', [
                'Tame Impala',
                'rock',
            ]),
            db.query('INSERT INTO Artist (name, genre) VALUES(?, ?)', [
                'Kylie Minogue',
                'pop',
            ]),
            db.query('INSERT INTO Artist (name, genre) VALUES(?, ?)', [
                'Dave Brubeck',
                'jazz',
            ]), 
        ]);
        // insert info into 'Artist' then assign to variable
        [artists] = await db.query('SELECT * FROM Artist');

        await Promise.all([
            db.query('INSERT INTO Album (name, year, artistId) VALUES(?, ?, ?)', [
                'The Slow Rush',
                2020,
                artists[0].id,
            ]),
            db.query('INSERT INTO Album (name, year, artistId) VALUES(?, ?, ?)', [
                'Disco',
                2020,
                artists[1].id,
            ]),
            db.query('INSERT INTO Album (name, year, artistId) VALUES(?, ?, ?)', [
                'Time In',
                1966,
                artists[2].id,
            ]),
        ]);
        // insert info into 'Album' then assign to variable
        [albums] = await db.query('SELECT * FROM Album');
    });

    afterEach(async () => {
        await db.query('DELETE FROM Album');
        await db.query('DELETE FROM Artist');
        await db.end();
    });

    // Find details of all albums
    describe('/album', () => {
        describe('GET', () => {
            it('returns all album records in the database', async () => {
                const res = await request(app).get('/album').send();

                expect(res.status).to.equal(200);
                expect(res.body.length).to.equal(3);

                res.body.forEach((albumRecord) => {
                    const expected = albums.find((a) => a.id === albumRecord.id);
                    // .find returns the first element that satisfies query
                    expect(albumRecord).to.deep.equal(expected);
                });
            });
        });
    });
    // Find details of a single album
    describe('/album/:artistId', () => {
        describe('GET', () => {
            it('returns a single album with the correct id', async () => {
                const expected = albums[0];
                const res = await request(app).get(`/album/${expected.id}`).send();

                expect(res.status).to.equal(200);
                expect(res.body).to.deep.equal(expected);
            });

            it('returns a 404 if the artist is not in the database', async () => {
                const res = await request(app).get('/album/999999').send();

                expect(res.status).to.equal(404);
            });
        });
    });
});