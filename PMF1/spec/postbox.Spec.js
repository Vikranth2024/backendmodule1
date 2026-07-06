const request = require('supertest');
const app = require('../app');
const router = require('../routes/letters');

describe('Postbox — Letter Tray API (single-resource CRUD, status codes, envelopes)', () => {
  beforeEach(() => {
    if (typeof router.__resetTray === 'function') router.__resetTray();
  });

  // Test 1: a newly created letter is immediately retrievable by its id.
  it('a created letter is retrievable by its id (create -> read round-trip)', async () => {
    const created = await request(app).post('/letters').send({ recipient: 'Wren', message: 'Key under the mat' });
    expect(created.status).toBe(201);
    const id = created.body.data.id;
    const fetched = await request(app).get(`/letters/${id}`);
    expect(fetched.status).toBe(200);
    expect(fetched.body.data.id).toBe(id);
    expect(fetched.body.data.recipient).toBe('Wren');
  });

  // Test 2: GET all -> 200 with the seeded letters inside { data }.
  it('GET /letters -> 200 with seeded letters inside { data }', async () => {
    const res = await request(app).get('/letters');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBe(2);
  });

  // Test 3: POST creates -> 201 with { data }, a generated id, delivered:false.
  it('POST /letters creates a letter -> 201 with { data }, generated id, delivered=false', async () => {
    const res = await request(app).post('/letters').send({ recipient: 'Nadia', message: 'Package arrived' });
    expect(res.status).toBe(201);
    expect(res.body.data).toBeDefined();
    expect(res.body.data.id).toBeDefined();
    expect(res.body.data.recipient).toBe('Nadia');
    expect(res.body.data.delivered).toBe(false);
  });

  // Test 4: POST with a missing field -> 400 { error }.
  it('POST /letters with a missing field -> 400 { error }', async () => {
    const res = await request(app).post('/letters').send({ recipient: 'No Message' });
    expect(res.status).toBe(400);
    expect(typeof res.body.error).toBe('string');
  });

  // Test 5: POST with an empty-string field -> 400.
  it('POST /letters with an empty-string recipient -> 400', async () => {
    const res = await request(app).post('/letters').send({ recipient: '   ', message: 'Hi' });
    expect(res.status).toBe(400);
  });

  // Test 6: GET by id -> 200 with the matching letter.
  it('GET /letters/:id -> 200 with the matching letter', async () => {
    const res = await request(app).get('/letters/1');
    expect(res.status).toBe(200);
    expect(res.body.data.id).toBe(1);
  });

  // Test 7: GET unknown id -> 404 { error }.
  it('GET /letters/:id for an unknown id -> 404 { error }', async () => {
    const res = await request(app).get('/letters/999');
    expect(res.status).toBe(404);
    expect(typeof res.body.error).toBe('string');
  });

  // Test 8: PUT replaces fields -> 200.
  it('PUT /letters/:id updates recipient and message -> 200', async () => {
    const res = await request(app).put('/letters/1').send({ recipient: 'Ada L.', message: 'Meet at noon' });
    expect(res.status).toBe(200);
    expect(res.body.data.recipient).toBe('Ada L.');
    expect(res.body.data.message).toBe('Meet at noon');
  });

  // Test 9: PATCH deliver flips the flag -> 200.
  it('PATCH /letters/:id/deliver marks the letter delivered -> 200', async () => {
    const res = await request(app).patch('/letters/1/deliver').send();
    expect(res.status).toBe(200);
    expect(res.body.data.delivered).toBe(true);
  });

  // Test 10: DELETE -> 204 no body and the letter is gone.
  it('DELETE /letters/:id -> 204 with no body and the letter is gone', async () => {
    const res = await request(app).delete('/letters/1');
    expect(res.status).toBe(204);
    expect(res.body).toEqual({});
    const after = await request(app).get('/letters/1');
    expect(after.status).toBe(404);
  });
});
