

StockRoom tracks products in a small warehouse. Each product has a name, a category, and a stock count. Someone can list all products, add a new one, look one up, update its details, restock it by adding more units, and remove it entirely.

The wiring is done, but every function is empty. Make the service work by completing all the functions in a single file. The data lives in a plain in-memory array (no database) that is re-seeded with two products before every run. A product looks like `{ id, name, category, stock }`.

## The Contract

Success responds with `{ data: }` and errors respond with `{ error: " " }`. Delete responds with `{ deleted: true }`.

## Files to Edit

You change **one file only**:

1. `index.js` holds the in-memory array and all six functions.

Do not edit anything inside `spec/`.

## Tasks

Complete the six functions in `index.js`:

1. `listProducts()` returns `{ data: [...] }` with every product.
2. `createProduct(name, category, stock)` validates input. If `name` is an empty string, `category` is an empty string, or `stock` is a number below zero, return `{ error: 'name, category and stock are required' }`. Otherwise assign a generated id, push the product to the array, and return `{ data: product }`.
3. `getProduct(id)` looks up by id and returns `{ data: product }`, or `{ error: 'Product not found' }` when missing.
4. `updateProduct(id, name, category, stock)` replaces all three fields on an existing product and returns `{ data: updatedProduct }`, or `{ error: 'Product not found' }` when missing.
5. `restockProduct(id, quantity)` adds `quantity` to the product's current stock. If `quantity` is not a positive number return `{ error: 'quantity must be a positive number' }`. If the product does not exist return `{ error: 'Product not found' }`. Otherwise return `{ data: updatedProduct }`.
6. `deleteProduct(id)` removes the product and returns `{ deleted: true }`, or `{ error: 'Product not found' }` when missing.

## Input and Output Examples

```javascript
// listProducts()
//   -> { data: [ { id: 1, name: 'Notebook', category: 'Stationery', stock: 50 }, ... ] }

// createProduct('Eraser', 'Stationery', 30)
//   -> { data: { id: 3, name: 'Eraser', category: 'Stationery', stock: 30 } }

// createProduct('', 'Stationery', 10)
//   -> { error: 'name, category and stock are required' }

// createProduct('Pen', 'Stationery', -1)
//   -> { error: 'name, category and stock are required' }

// getProduct(1)
//   -> { data: { id: 1, name: 'Notebook', category: 'Stationery', stock: 50 } }

// getProduct(999)
//   -> { error: 'Product not found' }

// updateProduct(1, 'Hardcover Notebook', 'Office', 75)
//   -> { data: { id: 1, name: 'Hardcover Notebook', category: 'Office', stock: 75 } }

// restockProduct(1, 20)
//   -> { data: { id: 1, name: 'Notebook', category: 'Stationery', stock: 70 } }

// restockProduct(1, -5)
//   -> { error: 'quantity must be a positive number' }

// deleteProduct(2)
//   -> { deleted: true }

// deleteProduct(999)
//   -> { error: 'Product not found' }
```

## Test Cases and Marks Distribution

*(10 tests × 2 marks = 20 marks)*

1. **Create → get round-trip:** a newly created product is retrievable by its id.
2. **List all:** `listProducts()` returns `{ data: [...] }` with both seeded products.
3. **Create valid:** valid input → `{ data }` with a generated id and correct stock.
4. **Create — empty name:** empty name string → `{ error }`.
5. **Create — negative stock:** stock below zero → `{ error }`.
6. **Get by id:** existing id → `{ data }` with the matching product.
7. **Get missing:** unknown id → `{ error }`.
8. **Update:** `updateProduct()` replaces name, category, and stock → `{ data }`.
9. **Restock:** `restockProduct()` adds the given quantity to the existing stock → `{ data }`.
10. **Delete:** `deleteProduct()` removes the product; a follow-up `getProduct()` returns `{ error }`.

## How to Test Your Solution

1. Open the terminal.
2. Run `npm test`.
3. All ten tests fail initially. Use the feedback to complete the functions until every test passes.
