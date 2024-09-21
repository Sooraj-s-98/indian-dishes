const express = require("express");
const errorLogger = require("../middleware/errorhandler");
const createRouteManager = require("../routes");
const { logInfo } = require("../logger");

const { SERVER_PORT } = process.env;

/**
 * Register the middlewares used in the API.
 * Start the server in the desired port.
 */
function startServer() {
  const app = express();
  logInfo("Registering body parser middlewares for server");
  app.use(express.json());
  logInfo("Registering route manager in server");
  app.use(createRouteManager());
  logInfo("Registering error logger middleware for server");
  app.use(errorLogger);
  logInfo(`Starting server on port: ${SERVER_PORT}`);
  app.listen(parseInt(SERVER_PORT));
}

module.exports = startServer;
