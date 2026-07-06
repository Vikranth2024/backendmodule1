# Greenhouse: Plants & Waterings API

## Difficulty

Hard.

## Problem Statement

Greenhouse keeps a log of the plants in a nursery and the waterings each plant receives. There are two related resources: a **plant** is `{ id, name, species }`, and a **watering** is `{ id, plantId, amountMl }` where `plantId` points at the plant that was watered.

Both routers are mounted, but every handler is empty. Make the API work by completing the two resource files. The data lives in a shared in-memory store (no database) that is re-seeded before every run.

## The Contract

Status codes: `201` create, `200` read or update, `400` bad input, `404` missing, `204` delete.

Success responds with `{ data: <payload> }` and errors respond with `{ error: "<safe string>" }`.

A watering may only reference a plant that exists. Deleting a plant also removes every watering that belongs to it.

## Files to Edit

You change **two files only**:

1. `routes/plants.js` is the plants resource.
2. `routes/waterings.js` is the waterings resource.

Both files share the data in `repository/store.js`. Do not edit `app.js`, `repository/store.js`, or anything inside `spec/`.

## Tasks

### `routes/plants.js`

1. `GET /` responds `200` with all plants wrapped in `{ data }`.
2. `POST /` reads `name` and `species`. If either is missing or an empty string, respond `400 { error: 'name and species are required' }`. Otherwise assign a generated id (`store.nextPlantId++`) and respond `201 { data }`.
3. `GET /:id` responds `200 { data }`, or `404 { error: 'Plant not found' }` when missing.
4. `PUT /:id` replaces `name` and `species` on an existing plant and responds `200 { data }`, or `404` when missing.
5. `DELETE /:id` removes the plant **and every watering that references it**, then responds `204` with no body, or `404` when missing.

### `routes/waterings.js`

1. `GET /` responds `200` with all waterings wrapped in `{ data }`.
2. `POST /` reads `plantId` and `amountMl`. If `amountMl` is not a number greater than `0`, respond `400 { error: 'amountMl must be a positive number' }`. If the referenced plant does not exist, respond `404 { error: 'Plant not found' }`. Otherwise assign a generated id (`store.nextWateringId++`) and respond `201 { data }`.
3. `GET /:id` responds `200 { data }`, or `404 { error: 'Watering not found' }` when missing.
4. `DELETE /:id` removes the watering and responds `204` with no body, or `404` when missing.

## Input and Output Examples

```javascript
// POST /plants    { "name": "Aloe", "species": "Aloe vera" }
//   -> 201  { "data": { "id": 3, "name": "Aloe", "species": "Aloe vera" } }

// POST /waterings { "plantId": 2, "amountMl": 30 }
//   -> 201  { "data": { "id": 2, "plantId": 2, "amountMl": 30 } }

// POST /waterings { "plantId": 999, "amountMl": 30 }   -> 404  { "error": "Plant not found" }
// POST /waterings { "plantId": 1, "amountMl": -5 }     -> 400  { "error": "amountMl must be a positive number" }
// DELETE /plants/1                                     -> 204  (empty body; its waterings vanish too)
```

## Test Cases and Marks Distribution

*(10 tests × 2 marks = 20 marks)*

1. **Cross-resource round-trip:** a created plant can be watered and the watering links back to it.
2. **GET all plants:** `200` with the seeded plants inside `{ data }`.
3. **POST plant:** valid body → `201 { data }` with a generated id.
4. **POST plant validation:** a missing field → `400 { error }`.
5. **GET plant missing → 404:** unknown id → `404 { error }`.
6. **PUT plant:** `name` and `species` replaced → `200`.
7. **POST watering (linked):** existing plant → `201 { data }` linked by `plantId`.
8. **Relationship guard:** watering for a non-existent plant → `404 { error }`.
9. **POST watering validation:** non-positive `amountMl` → `400`.
10. **Cascade delete:** deleting a plant → `204`, the plant is gone, and its waterings are removed.

## How to Test Your Solution

1. Open the terminal.
2. Run `npm test`.
3. All ten tests fail initially. Use the feedback to complete both resource files until every test passes.
