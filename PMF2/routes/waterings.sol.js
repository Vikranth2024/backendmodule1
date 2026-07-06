/**
 * SOLUTION — routes/waterings.js
 * (Rename to waterings.js to use.)
 */

const express = require('express');
const router = express.Router();
const store = require('../repository/store');

router.get('/', (req, res) => {
  res.status(200).json({ data: store.waterings });
});

router.post('/', (req, res) => {
  const { plantId, amountMl } = req.body;
  if (typeof amountMl !== 'number' || amountMl <= 0) {
    return res.status(400).json({ error: 'amountMl must be a positive number' });
  }
  const plant = store.plants.find((p) => p.id === Number(plantId));
  if (!plant) return res.status(404).json({ error: 'Plant not found' });
  const watering = { id: store.nextWateringId++, plantId: Number(plantId), amountMl };
  store.waterings.push(watering);
  return res.status(201).json({ data: watering });
});

router.get('/:id', (req, res) => {
  const watering = store.waterings.find((w) => w.id === Number(req.params.id));
  if (!watering) return res.status(404).json({ error: 'Watering not found' });
  return res.status(200).json({ data: watering });
});

router.delete('/:id', (req, res) => {
  const index = store.waterings.findIndex((w) => w.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Watering not found' });
  store.waterings.splice(index, 1);
  return res.status(204).end();
});

module.exports = router;
