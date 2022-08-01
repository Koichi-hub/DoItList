require('dotenv/config');
const express = require('express');
const { HOST, PORT, logger } = require('./config');
const middleware = require('./middleware');
const routes = require('./routes');

const app = express();

app.use(middleware);
app.use(routes);

app.listen(PORT, HOST, () => logger.info(`Server running on http://${HOST}:${PORT}/`));
