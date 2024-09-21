const { logInfo, logError } = require("../logger");
const { getIndianFoodList} = require("../database/indianFoods")


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
      const indianFoodList = await getIndianFoodList(
        req,
      );
    
      return res.status(200).send(indianFoodList);
    } catch (error) {
      logError("Error in function::indianFoodListHandler", error);
      next(error);
    }
  }


  module.exports = {
    indianFoodListHandler,
  };