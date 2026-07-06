# Postbox — Letter Tray API

## Problem Statement

**Postbox** tracks the letters waiting in a tray to be handed out. Someone can add a
letter, look one up, list them all, correct a letter's details, mark a letter as
**delivered**, and throw a letter away. The wiring is done, but every route is empty.

Your job is to make the API work by completing all the handlers in a **single file**.
The data lives in a plain **in-memory array** (no database), re-seeded with two letters
before every run.

A letter looks like: `{ id, recipient, message, delivered }`.

---

## The Contract

* **Status codes:** `201` create · `200` read/update · `400` bad input · `404` missing · `204` delete.
* **Success →** `{ data: <payload> }`
* **Error →** `{ error: "<safe string>" }`

---

## Files to Edit

You must change **one file**:

1. `routes/letters.js` — the in-memory array and all six route handlers.

`app.js` and the `spec/` folder are complete — **do not edit them**.

---

## Routes

| Method | Path                    | Behaviour |
|--------|-------------------------|-----------|
| GET    | `/letters`              | `200 { data: [...] }` |
| POST   | `/letters`              | validate → `201 { data }` / `400 { error }` |
| GET    | `/letters/:id`          | found `200` / missing `404` |
| PUT    | `/letters/:id`          | replace fields → `200 { data }` / `404` |
| PATCH  | `/letters/:id/deliver`  | `delivered = true` → `200 { data }` / `404` |
| DELETE | `/letters/:id`          | `204` no body / missing `404` |

---

## Input / Output Examples

```javascript
// POST /letters  { "recipient": "Nadia", "message": "Package arrived" }
//   -> 201  { "data": { "id": 3, "recipient": "Nadia", "message": "Package arrived", "delivered": false } }
// POST /letters  { "recipient": "No Message" }
//   -> 400  { "error": "recipient and message are required" }
// GET    /letters/999          -> 404  { "error": "Letter not found" }
// PATCH  /letters/1/deliver    -> 200  { "data": { ...delivered: true } }
// DELETE /letters/2            -> 204  (empty body)
```

---

## Test Cases and Marks Distribution

*(10 tests × 2 marks = 20 marks)*

1. **Create → read round-trip:** a newly created letter is retrievable by its id.
2. **GET all:** `200` with seeded letters inside `{ data }`.
3. **POST create:** valid body → `201 { data }`, generated id, `delivered: false`.
4. **POST validation:** missing field → `400 { error }`.
5. **POST empty check:** empty-string field → `400`.
6. **GET by id:** `200` with the matching letter.
7. **GET missing → 404:** unknown id → `404 { error }`.
8. **PUT update:** `recipient` and `message` replaced → `200`.
9. **PATCH deliver:** `delivered` flips to `true` → `200`.
10. **DELETE:** `204` no body, and the letter is gone.

---

## How to Test Your Solution

1. Open the terminal.
2. Run `npm test`.
3. **All tests fail initially.** Use the feedback to complete the handlers.
