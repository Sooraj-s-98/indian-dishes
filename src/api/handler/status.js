const { logInfo } = require("../logger");

/**
 * Creates a handler for a status request coming to the API.
 * @param {Request} _req The express request object.
 * @param {Response} res The express response object.
 * @param {NextFunction} _next The express next function.
 * @returns {Promise<Response<any, Record<string, any>> | void>} Responds with status.
 */
async function handler(_req, res, _next) {
  logInfo("Handling status request");
  return res.status(200).send({
    status: 200,
    message: "success",
  });
}

module.exports = handler;
