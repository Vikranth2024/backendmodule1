const request = require('supertest');
const app = require('../app');
const store = require('../repository/store');
const plantsRouter = require('../routes/plants');
const wateringsRouter = require('../routes/waterings');

describe('Greenhouse — Plants & Waterings (two related resources, full CRUD + relationship)', () => {
  beforeEach(() => {
    if (typeof store.__reset === 'function') store.__reset();
  });

  // Test 1: a created plant can be watered and the watering links back to it.
  it('a created plant can be watered and the watering links back (cross-resource round-trip)', async () => {
    const plant = await request(app).post('/plants').send({ name: 'Mint', species: 'Mentha' });
    expect(plant.status).toBe(201);
    const plantId = plant.body.data.id;
    const watering = await request(app).post('/waterings').send({ plantId, amountMl: 20 });
    expect(watering.status).toBe(201);
    expect(watering.body.data.plantId).toBe(plantId);
    const list = (await request(app).get('/waterings')).body.data;
    expect(list.some((w) => w.plantId === plantId)).toBe(true);
  });

  // Test 2: GET all plants -> 200 with the seeded plants inside { data }.
  it('GET /plants -> 200 with the seeded plants inside { data }', async () => {
    const res = await request(app).get('/plants');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBe(2);
  });

  // Test 3: POST plant -> 201 with { data } and a generated id.
  it('POST /plants creates a plant -> 201 with { data } and a generated id', async () => {
    const res = await request(app).post('/plants').send({ name: 'Aloe', species: 'Aloe vera' });
    expect(res.status).toBe(201);
    expect(res.body.data).toBeDefined();
    expect(res.body.data.id).toBeDefined();
    expect(res.body.data.name).toBe('Aloe');
  });

  // Test 4: POST plant with a missing field -> 400 { error }.
  it('POST /plants with a missing field -> 400 { error }', async () => {
    const res = await request(app).post('/plants').send({ name: 'No Species' });
    expect(res.status).toBe(400);
    expect(typeof res.body.error).toBe('string');
  });

  // Test 5: GET plant by unknown id -> 404 { error }.
  it('GET /plants/:id for an unknown id -> 404 { error }', async () => {
    const res = await request(app).get('/plants/999');
    expect(res.status).toBe(404);
    expect(typeof res.body.error).toBe('string');
  });

  // Test 6: PUT plant -> 200 with the replaced fields.
  it('PUT /plants/:id updates name and species -> 200', async () => {
    const res = await request(app).put('/plants/1').send({ name: 'Boston Fern', species: 'Nephrolepis exaltata' });
    expect(res.status).toBe(200);
    expect(res.body.data.name).toBe('Boston Fern');
    expect(res.body.data.species).toBe('Nephrolepis exaltata');
  });

  // Test 7: POST watering for an existing plant -> 201 linked by plantId.
  it('POST /waterings for an existing plant -> 201 with { data } linked by plantId', async () => {
    const res = await request(app).post('/waterings').send({ plantId: 2, amountMl: 30 });
    expect(res.status).toBe(201);
    expect(res.body.data.id).toBeDefined();
    expect(res.body.data.plantId).toBe(2);
    expect(res.body.data.amountMl).toBe(30);
  });

  // Test 8: POST watering referencing a missing plant -> 404 (the relationship).
  it('POST /waterings referencing a non-existent plant -> 404 { error }', async () => {
    const res = await request(app).post('/waterings').send({ plantId: 999, amountMl: 30 });
    expect(res.status).toBe(404);
    expect(typeof res.body.error).toBe('string');
  });

  // Test 9: POST watering with a non-positive amount -> 400.
  it('POST /waterings with a non-positive amountMl -> 400', async () => {
    const res = await request(app).post('/waterings').send({ plantId: 1, amountMl: -5 });
    expect(res.status).toBe(400);
  });

  // Test 10: DELETE plant cascades -> plant gone AND its waterings removed.
  it('DELETE /plants/:id -> 204, the plant is gone, and its waterings are removed', async () => {
    const res = await request(app).delete('/plants/1');
    expect(res.status).toBe(204);
    expect(res.body).toEqual({});

    const plantAfter = await request(app).get('/plants/1');
    expect(plantAfter.status).toBe(404);

    const waterings = (await request(app).get('/waterings')).body.data;
    expect(waterings.some((w) => w.plantId === 1)).toBe(false);
  });
});
