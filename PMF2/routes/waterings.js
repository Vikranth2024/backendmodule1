/**
 * routes/waterings.js — the WATERINGS resource (the second file you edit).
 *
 * A watering records how much water a plant received: { id, plantId, amountMl }.
 * The `plantId` MUST reference an existing plant.
 *
 * Shared data lives in ../repository/store.js:
 *   store.waterings       -> array of { id, plantId, amountMl }
 *   store.nextWateringId  -> id generator (use store.nextWateringId++)
 *   store.plants          -> array of { id, name, species } (to check the reference)
 *
 * THE CONTRACT
 *   Status codes: 201 create · 200 read · 400 bad input · 404 missing · 204 delete.
 *   Success  ->  { data: <payload> }
 *   Error    ->  { error: "<safe string>" }
 *
 * Implement the four FIX markers below.
 */

const express = require('express');
const router = express.Router();
const store = require('../repository/store');

// FIX 1: GET /  -> 200 with every watering wrapped in { data }.
router.get('/', (req, res) => {
  // TODO
});

// FIX 2: POST /  -> record a watering. Read `plantId` and `amountMl`.
//   * `amountMl` must be a number greater than 0, else
//     400 { error: 'amountMl must be a positive number' }.
//   * The plant referenced by `plantId` must exist, else
//     404 { error: 'Plant not found' }.
//   * Otherwise assign a generated id (store.nextWateringId++), store it,
//     and respond 201 { data: <the new watering> }.
router.post('/', (req, res) => {
  // TODO
});

// FIX 3: GET /:id  -> 200 { data } for the matching watering, or
//        404 { error: 'Watering not found' } when absent.
router.get('/:id', (req, res) => {
  // TODO
});

// FIX 4: DELETE /:id  -> remove the watering and respond 204 with no body,
//        or 404 { error: 'Watering not found' } when absent.
router.delete('/:id', (req, res) => {
  // TODO
});

module.exports = router;
