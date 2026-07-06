/**
 * routes/plants.js — the PLANTS resource (one of the two files you edit).
 *
 * Shared data lives in ../repository/store.js:
 *   store.plants        -> array of { id, name, species }
 *   store.nextPlantId   -> id generator (use store.nextPlantId++)
 *   store.waterings     -> array of { id, plantId, amountMl } (needed for delete)
 *
 * THE CONTRACT
 *   Status codes: 201 create · 200 read/update · 400 bad input · 404 missing · 204 delete.
 *   Success  ->  { data: <payload> }
 *   Error    ->  { error: "<safe string>" }
 *
 * Implement the five FIX markers below.
 */

const express = require('express');
const router = express.Router();
const store = require('../repository/store');

// FIX 1: GET /  -> 200 with every plant wrapped in { data }.
router.get('/', (req, res) => {
  // TODO
});

// FIX 2: POST /  -> create a plant.
//   * `name` and `species` must each be a non-empty string, else
//     400 { error: 'name and species are required' }.
//   * Otherwise assign a generated id (store.nextPlantId++), store it,
//     and respond 201 { data: <the new plant> }.
router.post('/', (req, res) => {
  // TODO
});

// FIX 3: GET /:id  -> 200 { data } for the matching plant, or
//        404 { error: 'Plant not found' } when absent.
router.get('/:id', (req, res) => {
  // TODO
});

// FIX 4: PUT /:id  -> replace `name` and `species` on an existing plant and
//        respond 200 { data }, or 404 { error: 'Plant not found' } when absent.
router.put('/:id', (req, res) => {
  // TODO
});

// FIX 5: DELETE /:id  -> remove the plant AND every watering that references it
//        (its plantId), then respond 204 with no body. Respond
//        404 { error: 'Plant not found' } when the plant does not exist.
router.delete('/:id', (req, res) => {
  // TODO
});

module.exports = router;
