/**
 * index.solution.js — REFERENCE SOLUTION. Do not share with students before the exam.
 *
 * This file passes all 10 test cases for the TaskFlow — Task Board problem.
 * It is structured identically to index.js so you can diff them side-by-side.
 *
 * Validation pattern used: falsy check (!title) and Array.includes() for enum —
 * consistent with what is taught in Module 1 lessons. No typeof is used.
 */

let tasks = [];
let nextId = 1;
const VALID_PRIORITIES = ['low', 'medium', 'high'];

function listTasks() {
  return { data: tasks };
}

function createTask(title, priority) {
  // !title catches undefined, null, and empty string ''
  // !VALID_PRIORITIES.includes(priority) rejects anything not in the allowed list
  if (!title || !VALID_PRIORITIES.includes(priority)) {
    return { error: 'title is required and priority must be low, medium or high' };
  }

  const task = { id: nextId++, title, priority, done: false };
  tasks.push(task);
  return { data: task };
}

function getTask(id) {
  const task = tasks.find(t => t.id === id);
  if (!task) return { error: 'Task not found' };
  return { data: task };
}

function updateTask(id, title, priority) {
  const task = tasks.find(t => t.id === id);
  if (!task) return { error: 'Task not found' };

  task.title = title;
  task.priority = priority;
  return { data: task };
}

function completeTask(id) {
  const task = tasks.find(t => t.id === id);
  if (!task) return { error: 'Task not found' };

  task.done = true;
  return { data: task };
}

function deleteTask(id) {
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) return { error: 'Task not found' };

  tasks.splice(index, 1);
  return { deleted: true };
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
