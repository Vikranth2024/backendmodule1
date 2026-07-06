/**
 * routes/letters.js — the ONLY file you edit.
 *
 * Postbox tracks letters waiting in a tray. Everything lives here: a plain
 * in-memory array (NO database), the route handlers, and the wiring. The array
 * is re-seeded with two letters before every test.
 *
 * A letter looks like: { id, recipient, message, delivered }
 *
 * THE CONTRACT
 *   Status codes: 201 create · 200 read/update · 400 bad input · 404 missing · 204 delete.
 *   Success  ->  { data: <payload> }
 *   Error    ->  { error: "<safe string>" }
 *
 * Each handler currently returns a 501 placeholder so the tests fail fast.
 * Replace every placeholder with the real logic described in its FIX note.
 * Do not change __resetTray or the exports.
 */

const express = require('express');
const router = express.Router();

let letters = [];
let nextId = 1;

// FIX 1: GET /  -> 200 with every letter wrapped in { data }.
router.get('/', (req, res) => {
  res.status(501).json({ error: 'Not implemented' }); // TODO: replace
});

// FIX 2: POST /  -> create a letter.
//   * `recipient` must be a non-empty string and `message` must be a non-empty
//     string. If either is missing/empty, respond 400 { error: 'recipient and message are required' }.
//   * Otherwise assign a generated id, start `delivered` at false, store it,
//     and respond 201 { data: <the new letter> }.
router.post('/', (req, res) => {
  res.status(501).json({ error: 'Not implemented' }); // TODO: replace
});

// FIX 3: GET /:id  -> 200 { data } for the matching letter, or
//        404 { error: 'Letter not found' } when no letter has that id.
router.get('/:id', (req, res) => {
  res.status(501).json({ error: 'Not implemented' }); // TODO: replace
});

// FIX 4: PUT /:id  -> replace `recipient` and `message` on an existing letter
//        and respond 200 { data }, or 404 { error: 'Letter not found' } when absent.
router.put('/:id', (req, res) => {
  res.status(501).json({ error: 'Not implemented' }); // TODO: replace
});

// FIX 5: PATCH /:id/deliver  -> set `delivered` to true and respond 200 { data },
//        or 404 { error: 'Letter not found' } when absent.
router.patch('/:id/deliver', (req, res) => {
  res.status(501).json({ error: 'Not implemented' }); // TODO: replace
});

// FIX 6: DELETE /:id  -> remove the letter and respond 204 with no body,
//        or 404 { error: 'Letter not found' } when absent.
router.delete('/:id', (req, res) => {
  res.status(501).json({ error: 'Not implemented' }); // TODO: replace
});

// Resets/seeds the tray between tests. DO NOT MODIFY.
function __resetTray() {
  letters = [
    { id: 1, recipient: 'Ada', message: 'Meet at the pier', delivered: false },
    { id: 2, recipient: 'Cyrus', message: 'Bring the maps', delivered: true },
  ];
  nextId = 3;
}
__resetTray();

module.exports = router;
module.exports.__resetTray = __resetTray;
