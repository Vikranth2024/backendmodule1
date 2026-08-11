/**
 * spec/taskboard.spec.js — DO NOT EDIT.
 *
 * 10 tests for the TaskFlow — Task Board service.
 * Run:  npm test
 * All tests start failing. Fix index.js until all 10 pass.
 */

const svc = require('../index');

describe('TaskFlow — Task Board (10 tests × 2 marks = 20 marks)', () => {

  beforeEach(() => svc.__resetStore());

  // ── Test 1 ─────────────────────────────────────────────────────────────────
  // A task created via createTask() must be retrievable by the id returned
  // inside { data }.
  it('Test 1 — create → get round-trip: created task is retrievable by its id', () => {
    const created = svc.createTask('Write unit tests', 'medium');
    expect(created.data).toBeDefined();

    const id = created.data.id;
    const fetched = svc.getTask(id);

    expect(fetched.data).toBeDefined();
    expect(fetched.data.id).toBe(id);
    expect(fetched.data.title).toBe('Write unit tests');
  });

  // ── Test 2 ─────────────────────────────────────────────────────────────────
  // listTasks() must return { data: [...] } containing all seeded tasks.
  it('Test 2 — listTasks returns { data: [...] } with all seeded tasks', () => {
    const res = svc.listTasks();
    expect(Array.isArray(res.data)).toBe(true);
    expect(res.data.length).toBe(2);
  });

  // ── Test 3 ─────────────────────────────────────────────────────────────────
  // createTask() with valid arguments must return { data } with a generated id,
  // the correct priority, and done set to false.
  it('Test 3 — createTask with valid input returns { data } with id, priority and done=false', () => {
    const res = svc.createTask('Deploy to production', 'high');
    expect(res.data).toBeDefined();
    expect(res.data.id).toBeDefined();
    expect(res.data.priority).toBe('high');
    expect(res.data.done).toBe(false);
  });

  // ── Test 4 ─────────────────────────────────────────────────────────────────
  // createTask() with an empty title must return { error }.
  it('Test 4 — createTask with an empty title returns { error }', () => {
    const res = svc.createTask('', 'low');
    expect(res.error).toBeDefined();
    expect(typeof res.error).toBe('string');
  });

  // ── Test 5 ─────────────────────────────────────────────────────────────────
  // createTask() with a priority not in ['low','medium','high'] must return { error }.
  it('Test 5 — createTask with invalid priority returns { error }', () => {
    const res = svc.createTask('Some task', 'urgent');
    expect(res.error).toBeDefined();
    expect(typeof res.error).toBe('string');
  });

  // ── Test 6 ─────────────────────────────────────────────────────────────────
  // getTask() with an existing id must return { data } with the matching task.
  it('Test 6 — getTask with existing id returns { data } with the matching task', () => {
    const res = svc.getTask(1);
    expect(res.data).toBeDefined();
    expect(res.data.id).toBe(1);
    expect(res.data.title).toBe('Buy groceries');
  });

  // ── Test 7 ─────────────────────────────────────────────────────────────────
  // getTask() with an unknown id must return { error }.
  it('Test 7 — getTask with unknown id returns { error }', () => {
    const res = svc.getTask(999);
    expect(res.error).toBeDefined();
    expect(typeof res.error).toBe('string');
  });

  // ── Test 8 ─────────────────────────────────────────────────────────────────
  // updateTask() must replace title and priority on the matching task.
  it('Test 8 — updateTask replaces title and priority → { data }', () => {
    const res = svc.updateTask(1, 'Buy organic groceries', 'medium');
    expect(res.data).toBeDefined();
    expect(res.data.title).toBe('Buy organic groceries');
    expect(res.data.priority).toBe('medium');
  });

  // ── Test 9 ─────────────────────────────────────────────────────────────────
  // completeTask() must flip done from false to true on the matching task.
  it('Test 9 — completeTask flips done to true → { data }', () => {
    const res = svc.completeTask(1);
    expect(res.data).toBeDefined();
    expect(res.data.done).toBe(true);
  });

  // ── Test 10 ────────────────────────────────────────────────────────────────
  // deleteTask() must remove the task; a follow-up getTask() for the same id
  // must return { error }.
  it('Test 10 — deleteTask removes task; subsequent getTask returns { error }', () => {
    const del = svc.deleteTask(1);
    expect(del.deleted).toBe(true);

    const after = svc.getTask(1);
    expect(after.error).toBeDefined();
  });

});
