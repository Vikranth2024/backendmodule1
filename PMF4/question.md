TaskFlow manages todo cards on a task board. Each task has a title, a priority level, and a completion flag. Someone can list all tasks, add a new one, look one up, update its details, mark it as complete, and delete it.

The wiring is done, but every function is empty. Make the service work by completing all the functions in a single file. The data lives in a plain in-memory array (no database) that is re-seeded with two tasks before every run. A task looks like `{ id, title, priority, done }`.

## The Contract

Success responds with `{ data: }` and errors respond with `{ error: " " }`. Delete responds with `{ deleted: true }`.

## Files to Edit

You change **one file only**:

1. `index.js` holds the in-memory array and all six functions.

Do not edit anything inside `spec/`.

## Tasks

Complete the six functions in `index.js`:

1. `listTasks()` returns `{ data: [...] }` with every task.
2. `createTask(title, priority)` validates input. If `title` is an empty string or `priority` is not one of `'low'`, `'medium'`, or `'high'`, return `{ error: 'title is required and priority must be low, medium or high' }`. Otherwise assign a generated id, set `done` to `false`, push the task to the array, and return `{ data: task }`.
3. `getTask(id)` looks up by id and returns `{ data: task }`, or `{ error: 'Task not found' }` when missing.
4. `updateTask(id, title, priority)` replaces `title` and `priority` on an existing task and returns `{ data: updatedTask }`, or `{ error: 'Task not found' }` when missing.
5. `completeTask(id)` sets `done` to `true` on the matching task and returns `{ data: updatedTask }`, or `{ error: 'Task not found' }` when missing.
6. `deleteTask(id)` removes the task and returns `{ deleted: true }`, or `{ error: 'Task not found' }` when missing.

## Input and Output Examples

```javascript
// listTasks()
//   -> { data: [ { id: 1, title: 'Buy groceries', priority: 'low', done: false }, ... ] }

// createTask('Deploy to production', 'high')
//   -> { data: { id: 3, title: 'Deploy to production', priority: 'high', done: false } }

// createTask('', 'low')
//   -> { error: 'title is required and priority must be low, medium or high' }

// createTask('Some task', 'urgent')
//   -> { error: 'title is required and priority must be low, medium or high' }

// getTask(2)
//   -> { data: { id: 2, title: 'Fix login bug', priority: 'high', done: false } }

// getTask(999)
//   -> { error: 'Task not found' }

// updateTask(1, 'Buy organic groceries', 'medium')
//   -> { data: { id: 1, title: 'Buy organic groceries', priority: 'medium', done: false } }

// completeTask(1)
//   -> { data: { id: 1, title: 'Buy groceries', priority: 'low', done: true } }

// deleteTask(2)
//   -> { deleted: true }

// deleteTask(999)
//   -> { error: 'Task not found' }
```

## Test Cases and Marks Distribution

*(10 tests × 2 marks = 20 marks)*

1. **Create → get round-trip:** a newly created task is retrievable by its id.
2. **List all:** `listTasks()` returns `{ data: [...] }` with both seeded tasks.
3. **Create valid:** valid input → `{ data }` with a generated id, correct priority, and `done: false`.
4. **Create — empty title:** empty title string → `{ error }`.
5. **Create — invalid priority:** priority not in `['low', 'medium', 'high']` → `{ error }`.
6. **Get by id:** existing id → `{ data }` with the matching task.
7. **Get missing:** unknown id → `{ error }`.
8. **Update:** `updateTask()` replaces title and priority → `{ data }`.
9. **Complete:** `completeTask()` flips `done` to `true` → `{ data }`.
10. **Delete:** `deleteTask()` removes the task; a follow-up `getTask()` returns `{ error }`.

## How to Test Your Solution

1. Open the terminal.
2. Run `npm test`.
3. All ten tests fail initially. Use the feedback to complete the functions until every test passes.
