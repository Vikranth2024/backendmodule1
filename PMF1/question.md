# Postbox: Letter Tray API

## Difficulty

Medium.

## Problem Statement

Postbox tracks the letters waiting in a tray to be handed out. Someone can add a letter, look one up, list them all, correct a letter's details, mark a letter as delivered, and throw a letter away.

The wiring is done, but every route is empty. Make the API work by completing all the handlers in a single file. The data lives in a plain in-memory array (no database) that is re-seeded with two letters before every run. A letter looks like `{ id, recipient, message, delivered }`.

## The Contract

Status codes: `201` create, `200` read or update, `400` bad input, `404` missing, `204` delete.

Success responds with `{ data: <payload> }` and errors respond with `{ error: "<safe string>" }`.

## Files to Edit

You change **one file only**:

1. `routes/letters.js` holds the in-memory array and all six route handlers.

Do not edit `app.js` or anything inside `spec/`.

## Tasks

Complete the six handlers in `routes/letters.js`:

1. `GET /` responds `200` with every letter wrapped in `{ data }`.
2. `POST /` reads `recipient` and `message`. If either is missing or an empty string, respond `400 { error: 'recipient and message are required' }`. Otherwise assign a generated id, start `delivered` at `false`, store the letter, and respond `201 { data }`.
3. `GET /:id` looks up by id and responds `200 { data }`, or `404 { error: 'Letter not found' }` when missing.
4. `PUT /:id` replaces `recipient` and `message` on an existing letter and responds `200 { data }`, or `404` when missing.
5. `PATCH /:id/deliver` sets `delivered` to `true` and responds `200 { data }`, or `404` when missing.
6. `DELETE /:id` removes the letter and responds `204` with no body, or `404` when missing.

## Input and Output Examples

```javascript
// POST /letters  { "recipient": "Nadia", "message": "Package arrived" }
//   -> 201  { "data": { "id": 3, "recipient": "Nadia", "message": "Package arrived", "delivered": false } }

// POST /letters  { "recipient": "No Message" }
//   -> 400  { "error": "recipient and message are required" }

// GET    /letters/999          -> 404  { "error": "Letter not found" }
// PATCH  /letters/1/deliver    -> 200  { "data": { ... "delivered": true } }
// DELETE /letters/2            -> 204  (empty body)
```

## Test Cases and Marks Distribution

*(10 tests × 2 marks = 20 marks)*

1. **Create → read round-trip:** a newly created letter is retrievable by its id.
2. **GET all:** `200` with the seeded letters inside `{ data }`.
3. **POST create:** valid body → `201 { data }`, a generated id, `delivered: false`.
4. **POST validation:** a missing field → `400 { error }`.
5. **POST empty check:** an empty-string field → `400`.
6. **GET by id:** `200` with the matching letter.
7. **GET missing → 404:** unknown id → `404 { error }`.
8. **PUT update:** `recipient` and `message` replaced → `200`.
9. **PATCH deliver:** the `delivered` flag flips to `true` → `200`.
10. **DELETE:** `204` no body, and the letter is gone afterwards.

## How to Test Your Solution

1. Open the terminal.
2. Run `npm test`.
3. All ten tests fail initially. Use the feedback to complete the handlers until every test passes.
