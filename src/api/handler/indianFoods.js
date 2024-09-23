const { logInfo, logError } = require("../logger");
const {
  getIndianFoodList,
  findFoodById,
  findDishesByIngredients,
  getIngredientList,
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

    const indianFoodList = await getIndianFoodList(req);

    return res.status(200).send(indianFoodList);
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
 * It returns a JSON response with the list of possible dishes. If no dishes are found, it responds with a 404 status code.
 * In case of any server-side errors during the process, it responds with a 500 status code indicating an internal server error.
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

    if (
      !userIngredients ||
      !Array.isArray(userIngredients) ||
      userIngredients.length === 0
    ) {
      return res
        .status(400)
        .send("Invalid input: 'ingredients' must be a non-empty array.");
    }

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

module.exports = {
  indianFoodListHandler,
  findFoodByIdHandler,
  findDishesByIngredientsHandler,
  ingredientListHandler,
};
