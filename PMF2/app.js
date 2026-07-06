/**
 * Greenhouse — a two-resource REST API: plants and their waterings.
 *
 * This wiring file is COMPLETE. Do not edit it.
 * It mounts the JSON body parser, the plants router at /plants, and the
 * waterings router at /waterings.
 *
 * Your job lives in TWO files (see README.md):
 *   routes/plants.js     and     routes/waterings.js
 */

const express = require('express');
const plantsRouter = require('./routes/plants');
const wateringsRouter = require('./routes/waterings');

const app = express();
app.use(express.json());
app.use('/plants', plantsRouter);
app.use('/waterings', wateringsRouter);

const PORT = 3000;
if (require.main === module) {
  app.listen(PORT, () => console.log(`Greenhouse API listening on http://localhost:${PORT}`));
}

module.exports = app;
