StockRoom tracks products in a small warehouse. Each product has a name, a category, and a stock count. Someone can list all products, add a new one, look one up, update its details, restock it by adding more units, and remove it entirely.

The wiring is done — the only file you touch is `index.js`. Every function currently returns `{}`, so all tests fail from the start. Your job is to replace each placeholder with the correct logic.

A product looks like: `{ id, name, category, stock }`.


## The Contract

- Success → `{ data: <product | product[]> }`
- Error → `{ error: "<message>" }`
- Delete → `{ deleted: true }`


## File to Edit

You must change **one file**:

1. `index.js` — the in-memory array and all six functions.

`spec/` and `index.solution.js` are complete — do **not** edit them.


## Functions to Implement

| Function | Behaviour |
|---|---|
| `listProducts()` | Return `{ data: [...] }` with all products |
| `createProduct(name, category, stock)` | Validate → `{ data }` / `{ error }` |
| `getProduct(id)` | Found `{ data }` / missing `{ error }` |
| `updateProduct(id, name, category, stock)` | Replace all fields → `{ data }` / `{ error }` |
| `restockProduct(id, quantity)` | Add to stock → `{ data }` / `{ error }` |
| `deleteProduct(id)` | Remove → `{ deleted: true }` / `{ error }` |

---

## Validation Rules

| Function | Rule |
|---|---|
| `createProduct` | `name` non-empty string · `category` non-empty string · `stock` number ≥ 0 |
| `restockProduct` | `quantity` must be a number > 0 |

Error message for `createProduct` failures: `'name, category and stock are required'`  
Error message for `restockProduct` bad quantity: `'quantity must be a positive number'`  
Error message for unknown id: `'Product not found'`


## Input / Output Examples

```js
// listProducts()
//   -> { data: [ { id: 1, name: 'Notebook', category: 'Stationery', stock: 50 }, ... ] }

// createProduct('Eraser', 'Stationery', 30)
//   -> { data: { id: 3, name: 'Eraser', category: 'Stationery', stock: 30 } }

// createProduct('', 'Stationery', 10)
//   -> { error: 'name, category and stock are required' }

// createProduct('Pen', 'Stationery', -1)
//   -> { error: 'name, category and stock are required' }

// getProduct(999)    -> { error: 'Product not found' }
// restockProduct(1, 20) -> { data: { id: 1, ..., stock: 70 } }   // 50 + 20
// restockProduct(1, -5) -> { error: 'quantity must be a positive number' }
// deleteProduct(999) -> { error: 'Product not found' }
```


## Test Cases and Marks Distribution

(10 tests × 2 marks = 20 marks)

1. **Create → get round-trip**: a product created via `createProduct()` is retrievable by its id.
2. **List all**: `listProducts()` returns `{ data: [...] }` with both seeded products.
3. **Create valid**: valid input → `{ data }` with a generated id and correct stock.
4. **Create — empty name**: empty name → `{ error }`.
5. **Create — negative stock**: negative stock → `{ error }`.
6. **Get by id**: existing id → `{ data }` with the matching product.
7. **Get missing**: unknown id → `{ error }`.
8. **Update**: `updateProduct()` replaces name, category, and stock → `{ data }`.
9. **Restock**: `restockProduct()` adds quantity to existing stock → `{ data }`.
10. **Delete**: `deleteProduct()` removes product; follow-up `getProduct()` returns `{ error }`.


## How to Test Your Solution

```bash
npm test
```

All 10 tests fail initially. Complete each function in `index.js` one by one until all pass.
