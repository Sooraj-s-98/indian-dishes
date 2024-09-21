const { Router } = require("express");

const statusHandler = require("../handler/status");

const { indianFoodListHandler} = require("../handler/indianFoods")

const { logInfo } = require("../logger");

/**
 * Initializes routes used in app.
 * To add a new route, It must be added here.
 */
function createRouter() {
  const router = Router();
  logInfo("Registering /status route used in the app");
  router.get("/status", statusHandler);

  router.get("/indian-foods", indianFoodListHandler);

  return router;
}

module.exports = createRouter;
