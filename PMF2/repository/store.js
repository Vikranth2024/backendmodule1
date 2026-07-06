/**
 * repository/store.js — the shared in-memory data (NO database).
 *
 * This file is COMPLETE. Do not edit it.
 *
 * It holds two related resources:
 *   plants    -> { id, name, species }
 *   waterings -> { id, plantId, amountMl }   (plantId references a plant's id)
 *
 * Both router files read and write these same arrays. The `__reset` helper
 * re-seeds the data before every test.
 */

const store = {
  plants: [],
  waterings: [],
  nextPlantId: 1,
  nextWateringId: 1,
};

function __reset() {
  store.plants = [
    { id: 1, name: 'Fern', species: 'Nephrolepis' },
    { id: 2, name: 'Basil', species: 'Ocimum basilicum' },
  ];
  store.waterings = [
    { id: 1, plantId: 1, amountMl: 50 },
  ];
  store.nextPlantId = 3;
  store.nextWateringId = 2;
}
__reset();

module.exports = store;
module.exports.__reset = __reset;
