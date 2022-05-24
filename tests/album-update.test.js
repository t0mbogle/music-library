const { expect } = require('chai');
const request = require('supertest');
const getDb = require('../src/services/db');
const app = require('../src/app');

describe('update album', () => {
    let db;
    let artists;
    let albums;

    beforeEach(async () => {
        db = await getDb();
        await Promise.all([
            db.query('INSERT INTO Artist (name, genre) VALUES(?, ?)', [
                'Tame Impala',
                'rock',
            ]),
            db.query('INSERT INTO Artist (name, genre) VALUES(?, ?)', [
                'Tom Misch',
                'soul',
            ]),
            db.query('INSERT INTO Artist (name, genre) VALUES(?, ?)', [
                'Disclosure',
                'house',
            ]), 
        ]);
        [artists] = await db.query('SELECT * FROM Artist');

        await Promise.all([
            db.query('INSERT INTO Album (name, year, artistId) VALUES(?, ?, ?)', [
                'The Slow Rush',
                2020,
                artists[0].id,
            ]),
            db.query('INSERT INTO Album (name, year, artistId) VALUES(?, ?, ?)', [
                'Geography',
                2018,
                artists[1].id,
            ]),
            db.query('INSERT INTO Album (name, year, artistId) VALUES(?, ?, ?)', [
                'Settle',
                2013,
                artists[2].id,
            ]),
        ]);
        [albums] = await db.query('SELECT * FROM Album');
    });

    afterEach(async () => {
        await db.query('DELETE FROM Album');
        await db.query('DELETE FROM Artist');
        await db.end();
    });

    describe('/album/:albumId', () => {
        describe('PATCH', () => {
            it('updates a single album with the correct id', async () => {
                const album = albums[0];
                const res = await request(app)
                  .patch(`/album/${album.id}`)
                  .send({ name: 'new name', year: 2018 });
                
                expect(res.status).to.equal(200);

                const [
                    [newAlbumRecord],
                ] = await db.query('SELECT * FROM Album WHERE id = ?', [album.id]);

                expect(newAlbumRecord.name).to.equal('new name');
                expect(newAlbumRecord.year).to.equal(2018);
            });

            it('returns a 404 if the artist is not in the database', async () => {
                const res = await request(app)
                  .patch('/album/999999')
                  .send({ name: 'new name' });
                
                expect(res.status).to.equal(404);
            });
        });
    });
})