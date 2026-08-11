/**
 * spec/inventory.spec.js — DO NOT EDIT.
 *
 * 10 tests for the StockRoom — Product Inventory service.
 * Run:  npm test
 * All tests start failing. Fix index.js until all 10 pass.
 */

const svc = require('../index');

describe('StockRoom — Product Inventory (10 tests × 2 marks = 20 marks)', () => {

  beforeEach(() => svc.__resetStore());

  // ── Test 1 ─────────────────────────────────────────────────────────────────
  // A product created via createProduct() must be retrievable by the id that
  // was returned inside { data }.
  it('Test 1 — create → get round-trip: created product is retrievable by its id', () => {
    const created = svc.createProduct('Eraser', 'Stationery', 30);
    expect(created.data).toBeDefined();

    const id = created.data.id;
    const fetched = svc.getProduct(id);

    expect(fetched.data).toBeDefined();
    expect(fetched.data.id).toBe(id);
    expect(fetched.data.name).toBe('Eraser');
  });

  // ── Test 2 ─────────────────────────────────────────────────────────────────
  // listProducts() must return { data: [...] } containing all seeded products.
  it('Test 2 — listProducts returns { data: [...] } with all seeded products', () => {
    const res = svc.listProducts();
    expect(Array.isArray(res.data)).toBe(true);
    expect(res.data.length).toBe(2);
  });

  // ── Test 3 ─────────────────────────────────────────────────────────────────
  // createProduct() with valid arguments must return { data } containing the
  // new product with a generated id and the correct stock value.
  it('Test 3 — createProduct with valid input returns { data } with generated id and correct stock', () => {
    const res = svc.createProduct('Ruler', 'Stationery', 10);
    expect(res.data).toBeDefined();
    expect(res.data.id).toBeDefined();
    expect(res.data.name).toBe('Ruler');
    expect(res.data.stock).toBe(10);
  });

  // ── Test 4 ─────────────────────────────────────────────────────────────────
  // createProduct() with an empty name must return { error }.
  it('Test 4 — createProduct with an empty name returns { error }', () => {
    const res = svc.createProduct('', 'Stationery', 10);
    expect(res.error).toBeDefined();
    expect(typeof res.error).toBe('string');
  });

  // ── Test 5 ─────────────────────────────────────────────────────────────────
  // createProduct() with a negative stock must return { error }.
  it('Test 5 — createProduct with negative stock returns { error }', () => {
    const res = svc.createProduct('Glue', 'Stationery', -5);
    expect(res.error).toBeDefined();
    expect(typeof res.error).toBe('string');
  });

  // ── Test 6 ─────────────────────────────────────────────────────────────────
  // getProduct() with an existing id must return { data } with the matching product.
  it('Test 6 — getProduct with existing id returns { data } with the matching product', () => {
    const res = svc.getProduct(1);
    expect(res.data).toBeDefined();
    expect(res.data.id).toBe(1);
    expect(res.data.name).toBe('Notebook');
  });

  // ── Test 7 ─────────────────────────────────────────────────────────────────
  // getProduct() with an unknown id must return { error }.
  it('Test 7 — getProduct with unknown id returns { error }', () => {
    const res = svc.getProduct(999);
    expect(res.error).toBeDefined();
    expect(typeof res.error).toBe('string');
  });

  // ── Test 8 ─────────────────────────────────────────────────────────────────
  // updateProduct() must replace name, category, and stock on the matching product.
  it('Test 8 — updateProduct replaces name, category and stock → { data }', () => {
    const res = svc.updateProduct(1, 'Hardcover Notebook', 'Office', 75);
    expect(res.data).toBeDefined();
    expect(res.data.name).toBe('Hardcover Notebook');
    expect(res.data.category).toBe('Office');
    expect(res.data.stock).toBe(75);
  });

  // ── Test 9 ─────────────────────────────────────────────────────────────────
  // restockProduct() must ADD the given quantity to the product's existing stock.
  it('Test 9 — restockProduct adds quantity to existing stock → { data }', () => {
    const before = svc.getProduct(1).data.stock; // 50
    const res = svc.restockProduct(1, 20);
    expect(res.data).toBeDefined();
    expect(res.data.stock).toBe(before + 20);
  });

  // ── Test 10 ────────────────────────────────────────────────────────────────
  // deleteProduct() must remove the product; a subsequent getProduct() for the
  // same id must return { error }.
  it('Test 10 — deleteProduct removes product; subsequent getProduct returns { error }', () => {
    const del = svc.deleteProduct(1);
    expect(del.deleted).toBe(true);

    const after = svc.getProduct(1);
    expect(after.error).toBeDefined();
  });

});
