require("./config/env");
const startServer = require("./server");
const { logError, logInfo } = require("./logger");
const { NODE_EXIT_SIGNAL } = require("./config/const");

/**
 * Exit the process.
 * @param {number} status The status to exit the process with.
 */
function exitProcess(status) {
  logInfo("Exiting application");
  process.exit(status);
}

/**
 * Cleanup on process exit.
 */
function cleanUpAfterClose() {
  logInfo("Cleaning up before application exit");
  exitProcess(0);
}

/**
 * Catch any uncaught exception.
 */
function listenForUncaughtException() {
  process.on("uncaughtException", (error) =>
    logError("Error in function::_listenForUncaughtException", error)
  );
}

/**
 * Tasks performed in init operation:
 * - Test connection with the database.
 * - Setting up the exit listners for the app.
 * - Initialize API server and start the same.
 *
 * In case of an error, the process will exit with status 1.
 */
async function init() {
  try {

    logInfo("Setting up the exit listners");
    process.on(NODE_EXIT_SIGNAL, cleanUpAfterClose);
    logInfo("Starting API server");
    startServer();
    listenForUncaughtException();
  } catch (error) {
    logError("Error in function::init", error);
    exitProcess(1);
  }
}

logInfo("Adapt Ready - v0.0.1");
logInfo("Starting application");

// Start app
init();
