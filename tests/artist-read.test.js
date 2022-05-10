const { expect } = require('chai');
const request = require('supertest');
const getDb = require('../src/services/db');
const app = require('../src/app');

describe('read artist', () => {
    let db;
    let artists;
    // outside of before and aftereach so these variables have the same scope as the tests
  
    beforeEach(async () => {
      db = await getDb();
      await Promise.all([
        db.query('INSERT INTO Artist (name, genre) VALUES(?, ?)', [
          'Tame Impala',
          'rock',
          // need data in the table before the test runs.
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
  
      [artists] = await db.query('SELECT * from Artist');
    });
  
    afterEach(async () => {
      await db.query('DELETE FROM Artist');
      await db.close();
    });
  
    describe('/artist', () => {
      describe('GET', () => {
        it('returns all artist records in the database', async () => {
          const res = await request(app).get('/artist').send();
  
          expect(res.status).to.equal(200);
          expect(res.body.length).to.equal(3);
  
          res.body.forEach((artistRecord) => {
            const expected = artists.find((a) => a.id === artistRecord.id);
  
            expect(artistRecord).to.deep.equal(expected);
          });
        });
      });
    });
});