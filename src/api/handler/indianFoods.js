const { logInfo, logError } = require("../logger");
const {
  getIndianFoodList,
  findFoodById,
  findDishesByIngredients,
  getIngredientList,
  search,
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
    const perPage = parseInt(req.query.per_page) || 50;
    const page = parseInt(req.query.page) || 1;
    const offset = perPage * page - perPage;
    const indianFoodList = await getIndianFoodList(req, offset, perPage);

    const totalCount = indianFoodList[0] ? indianFoodList[0].full_count : 0;

    const data = {
      last_page: Math.ceil(totalCount / perPage),
      current_page: page,
      per_page: perPage,
      from: offset,
      total: totalCount,
      list: indianFoodList,
      to: offset + indianFoodList.length,
    };

    return res.status(200).send(data);
  } catch (error) {
    logError("Error in function::indianFoodListHandler", error);
    next(error);
  }
}

/**
 * Handler to find and return food data by id.
 * Responds with 404 if not found, or 500 on server error.
 *
 * @param {Request} req Request object, with food name in params.
 * @param {Response} res Response object to send data or error.
 * @param {NextFunction} next Next middleware function.
 * @returns {Promise<Response<any, Record<string, any>> | void>} Response status.
 */
async function findFoodByIdHandler(req, res, next) {
  try {
    logInfo("Handler to find and return food data by id");
    const result = await findFoodById(req.params.id);
    const foodId = parseInt(req.params.id, 10);

    if (isNaN(foodId)) {
      throw new Error("Invalid ID format. ID must be an integer.");
    }
    if (result === "No matching food found") {
      return res.status(404).send(result);
    }
    res.json(result);
  } catch (error) {
    logError("Error in function::findFoodByIdHandler", error);
    res.status(500).send("Server error occurred while finding food by id.");
  }
}

/**
 * Asynchronously handles the request to find dishes based on the provided ingredients.
 * This function searches for dishes that can be made with the ingredients listed in the request body.
 *
 * @param {Request} req - The request object, expecting a body with a list of ingredients.
 * @param {Response} res - The response object used to send back data or error messages to the client.
 * @param {NextFunction} next - The next middleware function in the Express.js route chain.
 * @returns {Promise<Response<any, Record<string, any>> | void>} - A promise that resolves to a response object or void.
 */
async function findDishesByIngredientsHandler(req, res, next) {
  try {
    logInfo(
      "Handles the request to find dishes based on the provided ingredients"
    );
    const userIngredients = req.body.ingredients;

    const possibleDishes = await findDishesByIngredients(userIngredients);

    res.json(possibleDishes);
  } catch (error) {
    logError("Error in function::findDishesByIngredientsHandler", error);
    console.error(error);
    next(error);
  }
}

/**
 * Creates a handler for a get all ingredients.
 * @param {Request} req The express request object.
 * @param {Response} res The express response object.
 * @param {NextFunction} next The express next function.
 * @returns {Promise<Response<any, Record<string, any>> | void>} Responds with status.
 */
async function ingredientListHandler(req, res, next) {
  try {
    logInfo("Handling data request for ingredients list");

    const ingredientList = await getIngredientList(req);

    return res.status(200).send(ingredientList);
  } catch (error) {
    logError("Error in function::ingredientListHandler", error);
    next(error);
  }
}

/**
 * Creates a handler for search request in indian food.
 * @param {Request} req The express request object.
 * @param {Response} res The express response object.
 * @param {NextFunction} next The express next function.
 * @returns {Promise<Response<any, Record<string, any>> | void>} Responds with status.
 */
async function searchHandler(req, res, next) {
  try {
    logInfo("Handling search request in indian foods");

    const searchTerm = req.query.q;

    if (!searchTerm) {
      return res.status(400).json({ message: "Search term is required" });
    }

    const dishes = await search(searchTerm);

    return res.status(200).send(dishes);
  } catch (error) {
    logError("Error in function::searchHandler", error);
    next(error);
  }
}

module.exports = {
  indianFoodListHandler,
  findFoodByIdHandler,
  findDishesByIngredientsHandler,
  ingredientListHandler,
  searchHandler,
};
