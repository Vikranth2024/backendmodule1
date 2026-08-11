/**
 * index.js — the ONLY file you edit.
 *
 * StockRoom tracks products in a small warehouse. Everything lives here: a
 * plain in-memory array of products and six functions that operate on it.
 * The array is re-seeded with two products before every test run.
 *
 * A product looks like: { id, name, category, stock }
 *
 * THE CONTRACT
 * Success  -> { data: <product | product[]> }
 * Error    -> { error: "<message>" }
 * Delete   -> { deleted: true }
 *
 * Each function currently returns {} so all tests fail immediately.
 * Replace every placeholder with the real logic described in the FIX note
 * above it. Do NOT modify __resetStore or module.exports.
 */

let products = [];
let nextId = 1;

// ── FIX 1 ────────────────────────────────────────────────────────────────────
// Return { data: [...] } containing every product in the array.
function listProducts() {
  return {}; // TODO: replace
}

// ── FIX 2 ────────────────────────────────────────────────────────────────────
// Create a product.
//   • `name`     must be a non-empty string
//   • `category` must be a non-empty string
//   • `stock`    must be a number >= 0
//   If any rule fails -> { error: 'name, category and stock are required' }
//   Otherwise assign a generated id (nextId++), push to array,
//   and return { data: product }
function createProduct(name, category, stock) {
  return {}; // TODO: replace
}

// ── FIX 3 ────────────────────────────────────────────────────────────────────
// Return { data: product } for the matching numeric id.
// Return { error: 'Product not found' } when no product has that id.
function getProduct(id) {
  return {}; // TODO: replace
}

// ── FIX 4 ────────────────────────────────────────────────────────────────────
// Replace name, category, and stock on an existing product.
// Return { data: updatedProduct } on success.
// Return { error: 'Product not found' } when the id is unknown.
function updateProduct(id, name, category, stock) {
  return {}; // TODO: replace
}

// ── FIX 5 ────────────────────────────────────────────────────────────────────
// Add `quantity` to the product's current stock.
//   • `quantity` must be a number > 0, else { error: 'quantity must be a positive number' }
//   • Unknown id -> { error: 'Product not found' }
//   • Otherwise  -> { data: updatedProduct }  (stock = old stock + quantity)
function restockProduct(id, quantity) {
  return {}; // TODO: replace
}

// ── FIX 6 ────────────────────────────────────────────────────────────────────
// Remove the product with the given id from the array.
// Return { deleted: true } on success.
// Return { error: 'Product not found' } when the id is unknown.
function deleteProduct(id) {
  return {}; // TODO: replace
}

// ── DO NOT MODIFY BELOW THIS LINE ────────────────────────────────────────────
function __resetStore() {
  products = [
    { id: 1, name: 'Notebook', category: 'Stationery', stock: 50 },
    { id: 2, name: 'Pen',      category: 'Stationery', stock: 200 },
  ];
  nextId = 3;
}
__resetStore();

module.exports = {
  listProducts,
  createProduct,
  getProduct,
  updateProduct,
  restockProduct,
  deleteProduct,
  __resetStore,
};
