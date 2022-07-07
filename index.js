const log4js = require("log4js");
const path = require('path');
log4js.configure("./config/log4js.json");
var log = require("log4js").getLogger("deviants-factions");
const express = require("express");
const routerApi = require("./routes");

const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require("./middlewares/error.handler");

// Read File .env
require("dotenv").config();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

// Routes
routerApi(app);

const port = process.env.PORT || 4000;

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => log.info(`Running on http://localhost:${port}`));