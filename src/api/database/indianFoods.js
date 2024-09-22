const { query } = require("./index");
const { logError } = require("../logger");

/**
 * Fetch the indian foods live from database.
 * @param {object} req Request for fetch indian foods.
 * @returns {Promise<object>} The user data from database if any.
 */
async function getIndianFoodList(req) {
  try {
    const timeGte = req.query["time[gte]"];
    const timeLte = req.query["time[lte]"];
    const originState = req.query["origin[state]"];
    const diet = req.query.diet;

    let indianFoodDataQuery = "SELECT * FROM indian_foods WHERE 1=1";
    let queryParams = [];

    if (timeGte) {
      indianFoodDataQuery += " AND cooking_time >= ?";
      queryParams.push(timeGte);
    }

    if (timeLte) {
      indianFoodDataQuery += " AND cooking_time <= ?";
      queryParams.push(timeLte);
    }

    if (originState) {
      indianFoodDataQuery += " AND origin_state = ?";
      queryParams.push(originState);
    }

    if (diet) {
      indianFoodDataQuery += " AND diet = ?";
      queryParams.push(diet);
    }

    const indianFoodList = await query(indianFoodDataQuery, queryParams);

    if (!indianFoodList) return null;

    return indianFoodList;
  } catch (error) {
    logError("Error in function::getIndianFoodList", error);
    return Promise.reject(error);
  }
}

/**
 * Find food by Id from the database.
 * @param {Number} id Name of the food to find.
 * @returns {Promise<object>} The food data from database if any.
 */
async function findFoodById(id) {
  try {
    if (!id) {
      throw new Error("Food id is required");
    }

    let foodDataQuery = "SELECT * FROM indian_foods WHERE id = ?";

    const [rows] = await query(foodDataQuery, [id]);
    return rows ? rows : "No matching food found";
  } catch (error) {
    logError("Error in function::findFoodById:", error);
    throw error;
  }
}

/**
 * Searches for dishes in the 'indian_foods' table that can be made with the provided ingredients.
 *
 * @param {string[]} userIngredients - An array of ingredients provided by the user.
 * @returns {Promise<Object[]>} A promise that resolves to an array of dish records that match the criteria.
 * @throws {Error} Throws an error if the query execution fails.
 */
async function findDishesByIngredients(userIngredients) {
  try {
    const sqlQuery = `SELECT * FROM indian_foods WHERE (
                      SELECT COUNT(*)
                      FROM JSON_TABLE(ingredients, '$[*]' COLUMNS(ingredient VARCHAR(255) PATH '$')) jt
                      WHERE jt.ingredient NOT IN (${userIngredients
                        .map((i) => `'${i}'`)
                        .join(", ")})
                      ) = 0;
                       `;

    const dishNames = await query(sqlQuery);

    return dishNames;
  } catch (error) {
    logError("Error in function::findDishesByIngredients:", error);
    throw error;
  }
}

module.exports = {
  getIndianFoodList,
  findFoodById,
  findDishesByIngredients,
};
