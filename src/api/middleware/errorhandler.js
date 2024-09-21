const { logError } = require("../logger");

/**
 * Log the error details and return the error response to user.
 * @param {any} error The error occurred while handling the request.
 * @param {Request} req The express request object.
 * @param {Response} res The express response object.
 * @param {NextFunction} _next The express next function.
 * @returns {Response<any, Record<string, any>>} Responds with error if any.
 */
function handler(error, req, res, _next) {
  logError(`Error while calling API: ${req.url}`, error);
  return res.status(500).send({
    message: 500,
    status: "An unexpected error occurred",
  });
}

module.exports = handler;
