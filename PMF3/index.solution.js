/**
 * index.solution.js — REFERENCE SOLUTION. Do not share with students before the exam.
 *
 * This file passes all 10 test cases for the StockRoom — Product Inventory problem.
 * It is structured identically to index.js so you can diff them side-by-side.
 *
 * Validation pattern used: falsy check (!name) — consistent with what is taught
 * in Module 1 lessons. No typeof is used.
 */

let products = [];
let nextId = 1;

function listProducts() {
  return { data: products };
}

function createProduct(name, category, stock) {
  // !name catches undefined, null, and empty string ''
  // !(stock >= 0) catches negative numbers, undefined, and null without typeof
  if (!name || !category || !(stock >= 0)) {
    return { error: 'name, category and stock are required' };
  }

  const product = { id: nextId++, name, category, stock };
  products.push(product);
  return { data: product };
}

function getProduct(id) {
  const product = products.find(p => p.id === id);
  if (!product) return { error: 'Product not found' };
  return { data: product };
}

function updateProduct(id, name, category, stock) {
  const product = products.find(p => p.id === id);
  if (!product) return { error: 'Product not found' };

  product.name = name;
  product.category = category;
  product.stock = stock;
  return { data: product };
}

function restockProduct(id, quantity) {
  // !quantity catches 0/undefined; quantity <= 0 catches negatives
  if (!quantity || quantity <= 0) {
    return { error: 'quantity must be a positive number' };
  }

  const product = products.find(p => p.id === id);
  if (!product) return { error: 'Product not found' };

  product.stock += quantity;
  return { data: product };
}

function deleteProduct(id) {
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return { error: 'Product not found' };

  products.splice(index, 1);
  return { deleted: true };
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
