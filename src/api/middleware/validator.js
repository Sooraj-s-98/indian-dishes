const { logInfo, logError } = require("../logger");

/**
 * Creates a validator and returns the handler for that validator.
 * @param {Joi.schema} schema The schema for the validator.
 * @returns {Function} The handler function.
 */
function createValidator(schema) {
  /**
   * Validate a request.
   * @param {Request} req The express request object.
   * @param {Response} res The express response object.
   * @param {NextFunction} next The express next function.
   * @returns {Response<any, Record<string, any>> | void } Responds with error if any, otherwise call next function.
   */
  return function (req, res, next) {
    const { error } = schema.validate(req.body, {
      abortEarly: true,
      convert: true,
      stripUnknown: true,
    });
    if (!error) {
      logInfo(`Validated schema ${schema.type}, for API: ${req.url}`);
      return next();
    }
    logError(
      `Errors found while validating schema ${schema.type}, for API: ${req.url}`,
      error,
    );
    return res.status(400).send({
      message: 400,
      status: error.message,
    });
  };
}

module.exports = createValidator;
