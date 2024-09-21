const express = require("express");
const path = require("path");
const createAPIV1Router = require("./apiv1");
const { logInfo } = require("../logger");

/**
 * Initializes routes used in app.
 * To add a new route, It must be added here.
 */
function createRouteManager() {
  const router = express.Router();
  logInfo("Registering API routes for /api/v1 in server");
  router.use("/api/v1", createAPIV1Router());
  logInfo("Registering public asses routes in server");
  router.use(express.static(path.resolve(__dirname, "../../public")));
  router.get("*", (_, res) => res.sendFile(path.join(__dirname, "../../public/index.html")));
  return router;
}

module.exports = createRouteManager;
