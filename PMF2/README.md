# Greenhouse — Plants & Waterings API

## Problem Statement

**Greenhouse** logs the plants in a nursery and the waterings each plant receives.
There are **two related resources**: a **plant** is `{ id, name, species }`, and a
**watering** is `{ id, plantId, amountMl }` where `plantId` points at the plant that
was watered.

Both routers are mounted, but every handler is empty. Make the API work by completing
the two resource files. The data lives in a **shared in-memory store** (no database),
re-seeded before every run.

---

## The Contract

* **Status codes:** `201` create · `200` read/update · `400` bad input · `404` missing · `204` delete.
* **Success →** `{ data: <payload> }`
* **Error →** `{ error: "<safe string>" }`
* A watering may only reference a plant that **exists**.
* Deleting a plant also removes **every watering that belongs to it**.

---

## Files to Edit

You must change **two files**:

1. `routes/plants.js` — the plants resource (full CRUD + cascade delete).
2. `routes/waterings.js` — the waterings resource (CRUD + relationship guard).

Both files share `repository/store.js`. `app.js`, `repository/store.js`, and the
`spec/` folder are complete — **do not edit them**.

---

## Routes

| Method | Path              | Behaviour |
|--------|-------------------|-----------|
| GET    | `/plants`         | `200 { data: [...] }` |
| POST   | `/plants`         | validate → `201 { data }` / `400 { error }` |
| GET    | `/plants/:id`     | found `200` / missing `404` |
| PUT    | `/plants/:id`     | replace fields → `200` / `404` |
| DELETE | `/plants/:id`     | `204` + cascade waterings / missing `404` |
| GET    | `/waterings`      | `200 { data: [...] }` |
| POST   | `/waterings`      | `400` bad amount · `404` missing plant · else `201 { data }` |
| GET    | `/waterings/:id`  | found `200` / missing `404` |
| DELETE | `/waterings/:id`  | `204` no body / missing `404` |

---

## Input / Output Examples

```javascript
// POST /plants    { "name": "Aloe", "species": "Aloe vera" }
//   -> 201  { "data": { "id": 3, "name": "Aloe", "species": "Aloe vera" } }
// POST /waterings { "plantId": 2, "amountMl": 30 }
//   -> 201  { "data": { "id": 2, "plantId": 2, "amountMl": 30 } }
// POST /waterings { "plantId": 999, "amountMl": 30 }   -> 404  { "error": "Plant not found" }
// POST /waterings { "plantId": 1, "amountMl": -5 }     -> 400  { "error": "amountMl must be a positive number" }
// DELETE /plants/1                                     -> 204  (its waterings vanish too)
```

---

## Test Cases and Marks Distribution

*(10 tests × 2 marks = 20 marks)*

1. **Cross-resource round-trip:** a created plant can be watered and the watering links back to it.
2. **GET all plants:** `200` with seeded plants inside `{ data }`.
3. **POST plant:** valid body → `201 { data }` with a generated id.
4. **POST plant validation:** missing field → `400 { error }`.
5. **GET plant missing → 404:** unknown id → `404 { error }`.
6. **PUT plant:** `name` and `species` replaced → `200`.
7. **POST watering (linked):** existing plant → `201 { data }` linked by `plantId`.
8. **Relationship guard:** watering for a non-existent plant → `404 { error }`.
9. **POST watering validation:** non-positive `amountMl` → `400`.
10. **Cascade delete:** deleting a plant → `204`, plant gone, its waterings removed.

---

## How to Test Your Solution

1. Open the terminal.
2. Run `npm test`.
3. **All tests fail initially.** Complete both resource files until every test passes.
