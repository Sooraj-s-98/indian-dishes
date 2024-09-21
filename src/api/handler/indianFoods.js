const { logInfo, logError } = require("../logger");
const {
  getIndianFoodList,
  findFoodByName,
} = require("../database/indianFoods");

/**
 * Creates a handler for a get all indian foods data.
 * @param {Request} req The express request object.
 * @param {Response} res The express response object.
 * @param {NextFunction} next The express next function.
 * @returns {Promise<Response<any, Record<string, any>> | void>} Responds with status.
 */
async function indianFoodListHandler(req, res, next) {
  try {
    logInfo("Handling data request for indian foods list");
    const perPage = 15;
    const page = parseInt(req.query.page) || 1;
    const offset = perPage * page - perPage;
    const indianFoodList = await getIndianFoodList(req);

    return res.status(200).send(indianFoodList);
  } catch (error) {
    logError("Error in function::indianFoodListHandler", error);
    next(error);
  }
}

/**
 * Handler to find and return food data by name.
 * Responds with 404 if not found, or 500 on server error.
 *
 * @param {Request} req Request object, with food name in params.
 * @param {Response} res Response object to send data or error.
 * @param {NextFunction} next Next middleware function.
 * @returns {Promise<Response<any, Record<string, any>> | void>} Response status.
 */
async function findFoodByNameHandler(req, res, next) {
  try {
    const foodName = decodeURIComponent(req.params.name);
    const result = await findFoodByName(foodName);
    if (result === "No matching food found") {
      return res.status(404).send(result);
    }
    res.json(result);
  } catch (error) {
    res.status(500).send("Server error occurred while finding food by name.");
  }
}

module.exports = {
  indianFoodListHandler,
  findFoodByNameHandler,
};
