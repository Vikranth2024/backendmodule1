/**
 * SOLUTION — routes/letters.js
 * (Rename to letters.js to use.)
 */

const express = require('express');
const router = express.Router();

let letters = [];
let nextId = 1;

router.get('/', (req, res) => {
  res.status(200).json({ data: letters });
});

router.post('/', (req, res) => {
  const { recipient, message } = req.body;
  if (
    typeof recipient !== 'string' || recipient.trim() === '' ||
    typeof message !== 'string' || message.trim() === ''
  ) {
    return res.status(400).json({ error: 'recipient and message are required' });
  }
  const letter = { id: nextId++, recipient, message, delivered: false };
  letters.push(letter);
  return res.status(201).json({ data: letter });
});

router.get('/:id', (req, res) => {
  const letter = letters.find((l) => l.id === Number(req.params.id));
  if (!letter) return res.status(404).json({ error: 'Letter not found' });
  return res.status(200).json({ data: letter });
});

router.put('/:id', (req, res) => {
  const letter = letters.find((l) => l.id === Number(req.params.id));
  if (!letter) return res.status(404).json({ error: 'Letter not found' });
  const { recipient, message } = req.body;
  letter.recipient = recipient;
  letter.message = message;
  return res.status(200).json({ data: letter });
});

router.patch('/:id/deliver', (req, res) => {
  const letter = letters.find((l) => l.id === Number(req.params.id));
  if (!letter) return res.status(404).json({ error: 'Letter not found' });
  letter.delivered = true;
  return res.status(200).json({ data: letter });
});

router.delete('/:id', (req, res) => {
  const index = letters.findIndex((l) => l.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Letter not found' });
  letters.splice(index, 1);
  return res.status(204).end();
});

function __resetTray() {
  letters = [
    { id: 1, recipient: 'Ada', message: 'Meet at the pier', delivered: false },
    { id: 2, recipient: 'Cyrus', message: 'Bring the maps', delivered: true },
  ];
  nextId = 3;
}
__resetTray();

module.exports = router;
module.exports.__resetTray = __resetTray;
