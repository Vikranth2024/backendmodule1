/**
 * index.js — the ONLY file you edit.
 *
 * TaskFlow manages todo cards on a task board. Everything lives here: a plain
 * in-memory array of tasks and six functions that operate on it. The array is
 * re-seeded with two tasks before every test run.
 *
 * A task looks like: { id, title, priority, done }
 * Valid priorities: 'low' | 'medium' | 'high'
 *
 * THE CONTRACT
 * Success  -> { data: <task | task[]> }
 * Error    -> { error: "<message>" }
 * Delete   -> { deleted: true }
 *
 * Each function currently returns {} so all tests fail immediately.
 * Replace every placeholder with the real logic described in the FIX note
 * above it. Do NOT modify __resetStore or module.exports.
 */

let tasks = [];
let nextId = 1;
const VALID_PRIORITIES = ['low', 'medium', 'high'];

// ── FIX 1 ────────────────────────────────────────────────────────────────────
// Return { data: [...] } containing every task in the array.
function listTasks() {
  return {}; // TODO: replace
}

// ── FIX 2 ────────────────────────────────────────────────────────────────────
// Create a task.
//   • `title`    must be a non-empty string
//   • `priority` must be one of 'low', 'medium', or 'high'
//   If any rule fails -> { error: 'title is required and priority must be low, medium or high' }
//   Otherwise assign a generated id (nextId++), set done to false, push to
//   the array, and return { data: task }
function createTask(title, priority) {
  return {}; // TODO: replace
}

// ── FIX 3 ────────────────────────────────────────────────────────────────────
// Return { data: task } for the matching numeric id.
// Return { error: 'Task not found' } when no task has that id.
function getTask(id) {
  return {}; // TODO: replace
}

// ── FIX 4 ────────────────────────────────────────────────────────────────────
// Replace title and priority on an existing task.
// Return { data: updatedTask } on success.
// Return { error: 'Task not found' } when the id is unknown.
function updateTask(id, title, priority) {
  return {}; // TODO: replace
}

// ── FIX 5 ────────────────────────────────────────────────────────────────────
// Set `done` to true on the task with the given id.
// Return { data: updatedTask } on success.
// Return { error: 'Task not found' } when the id is unknown.
function completeTask(id) {
  return {}; // TODO: replace
}

// ── FIX 6 ────────────────────────────────────────────────────────────────────
// Remove the task with the given id from the array.
// Return { deleted: true } on success.
// Return { error: 'Task not found' } when the id is unknown.
function deleteTask(id) {
  return {}; // TODO: replace
}

// ── DO NOT MODIFY BELOW THIS LINE ────────────────────────────────────────────
function __resetStore() {
  tasks = [
    { id: 1, title: 'Buy groceries', priority: 'low',  done: false },
    { id: 2, title: 'Fix login bug', priority: 'high', done: false },
  ];
  nextId = 3;
}
__resetStore();

module.exports = {
  listTasks,
  createTask,
  getTask,
  updateTask,
  completeTask,
  deleteTask,
  __resetStore,
};
