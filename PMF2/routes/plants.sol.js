/**
 * SOLUTION — routes/plants.js
 * (Rename to plants.js to use.)
 */

const express = require('express');
const router = express.Router();
const store = require('../repository/store');

router.get('/', (req, res) => {
  res.status(200).json({ data: store.plants });
});

router.post('/', (req, res) => {
  const { name, species } = req.body;
  if (
    typeof name !== 'string' || name.trim() === '' ||
    typeof species !== 'string' || species.trim() === ''
  ) {
    return res.status(400).json({ error: 'name and species are required' });
  }
  const plant = { id: store.nextPlantId++, name, species };
  store.plants.push(plant);
  return res.status(201).json({ data: plant });
});

router.get('/:id', (req, res) => {
  const plant = store.plants.find((p) => p.id === Number(req.params.id));
  if (!plant) return res.status(404).json({ error: 'Plant not found' });
  return res.status(200).json({ data: plant });
});

router.put('/:id', (req, res) => {
  const plant = store.plants.find((p) => p.id === Number(req.params.id));
  if (!plant) return res.status(404).json({ error: 'Plant not found' });
  const { name, species } = req.body;
  plant.name = name;
  plant.species = species;
  return res.status(200).json({ data: plant });
});

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = store.plants.findIndex((p) => p.id === id);
  if (index === -1) return res.status(404).json({ error: 'Plant not found' });
  store.plants.splice(index, 1);
  store.waterings = store.waterings.filter((w) => w.plantId !== id);
  return res.status(204).end();
});

module.exports = router;
