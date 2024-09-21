const { createLogger, format, transports } = require("winston");

const { combine, timestamp, printf } = format;

/**
 * Create new logger.
 * @returns {winston.Logger} New logger.
 */
function createNewLogger() {
  const customFormat = printf(
    ({ message, timestamp: time }) => `${time}: ${message}`
  );
  const logger = createLogger({
    format: combine(timestamp(), customFormat),
    transports: [
      new transports.Console({
        format: combine(timestamp(), customFormat),
      }),
    ],
  });
  return logger;
}

/**
 * Create both info logger and error logger.
 * Also initiated the custom format.
 */
const infoLogger = createNewLogger();
const errorLogger = createNewLogger();

/**
 * Logs an info message.
 * @param {string} message Message to log.
 */
function logInfo(message) {
  infoLogger.info(message);
}

/**
 * Logs an error message.
 * @param {string} message Message to log.
 * @param {Error | AppError} error Error to log.
 */
function logError(message, error) {
  errorLogger.error(`${message}, error:${error.stack || error}`);
}

module.exports = { logInfo, logError };
