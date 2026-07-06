/**
 * Postbox — a letter-tray REST API.
 *
 * This wiring file is COMPLETE. Do not edit it.
 * It mounts the JSON body parser and the letters router at /letters.
 * Your job lives in ONE file:  routes/letters.js  (see README.md).
 */

const express = require('express');
const lettersRouter = require('./routes/letters');

const app = express();
app.use(express.json());
app.use('/letters', lettersRouter);

const PORT = 3000;
if (require.main === module) {
  app.listen(PORT, () => console.log(`Postbox API listening on http://localhost:${PORT}`));
}

module.exports = app;
