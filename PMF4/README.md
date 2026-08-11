# TaskFlow — Task Board Service

## Problem Statement

TaskFlow manages todo cards on a task board. Each task has a title, a priority level, and a completion flag. Someone can list all tasks, add a new one, look one up, update its details, mark it as complete, and delete it.

The wiring is done — the only file you touch is `index.js`. Every function currently returns `{}`, so all tests fail from the start. Your job is to replace each placeholder with the correct logic.

A task looks like: `{ id, title, priority, done }`.

---

## The Contract

- Success → `{ data: <task | task[]> }`
- Error → `{ error: "<message>" }`
- Delete → `{ deleted: true }`

---

## File to Edit

You must change **one file**:

1. `index.js` — the in-memory array and all six functions.

`spec/` and `index.solution.js` are complete — do **not** edit them.

---

## Functions to Implement

| Function | Behaviour |
|---|---|
| `listTasks()` | Return `{ data: [...] }` with all tasks |
| `createTask(title, priority)` | Validate → `{ data }` / `{ error }` |
| `getTask(id)` | Found `{ data }` / missing `{ error }` |
| `updateTask(id, title, priority)` | Replace fields → `{ data }` / `{ error }` |
| `completeTask(id)` | Set `done = true` → `{ data }` / `{ error }` |
| `deleteTask(id)` | Remove → `{ deleted: true }` / `{ error }` |

---

## Validation Rules

| Function | Rule |
|---|---|
| `createTask` | `title` non-empty string · `priority` must be `'low'`, `'medium'`, or `'high'` |

Error message for `createTask` failures: `'title is required and priority must be low, medium or high'`  
Error message for unknown id: `'Task not found'`

---

## Input / Output Examples

```js
// listTasks()
//   -> { data: [ { id: 1, title: 'Buy groceries', priority: 'low', done: false }, ... ] }

// createTask('Deploy to production', 'high')
//   -> { data: { id: 3, title: 'Deploy to production', priority: 'high', done: false } }

// createTask('', 'low')
//   -> { error: 'title is required and priority must be low, medium or high' }

// createTask('Some task', 'urgent')
//   -> { error: 'title is required and priority must be low, medium or high' }

// getTask(999)       -> { error: 'Task not found' }
// completeTask(1)    -> { data: { id: 1, ..., done: true } }
// deleteTask(999)    -> { error: 'Task not found' }
```

---

## Test Cases and Marks Distribution

(10 tests × 2 marks = 20 marks)

1. **Create → get round-trip**: a task created via `createTask()` is retrievable by its id.
2. **List all**: `listTasks()` returns `{ data: [...] }` with both seeded tasks.
3. **Create valid**: valid input → `{ data }` with a generated id, correct priority, and `done: false`.
4. **Create — empty title**: empty title → `{ error }`.
5. **Create — invalid priority**: priority not in `['low','medium','high']` → `{ error }`.
6. **Get by id**: existing id → `{ data }` with the matching task.
7. **Get missing**: unknown id → `{ error }`.
8. **Update**: `updateTask()` replaces title and priority → `{ data }`.
9. **Complete**: `completeTask()` flips `done` to `true` → `{ data }`.
10. **Delete**: `deleteTask()` removes task; follow-up `getTask()` returns `{ error }`.

---

## How to Test Your Solution

```bash
npm test
```

All 10 tests fail initially. Complete each function in `index.js` one by one until all pass.
