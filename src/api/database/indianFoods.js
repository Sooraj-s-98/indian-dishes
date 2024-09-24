const { query } = require("./index");
const { logError } = require("../logger");
const mysql = require('mysql2');

/**
 * Fetch the indian foods live from database.
 * @param {object} req Request for fetch indian foods.
 * @returns {Promise<object>} The user data from database if any.
 */
async function getIndianFoodList(req, offset, perPage) {
  try {
    const timeGte = req.query["time[gte]"];
    const timeLte = req.query["time[lte]"];
    const originState = req.query["origin[state]"];
    const diet = req.query.diet;
    const searchTerm = req.query.q;
    const likeTerm = mysql.escape(`%${searchTerm}%`);

    const sortParam = req.query.sort;

    const sortMappings = {
      "name.asc": "name ASC",
      "name.desc": "name DESC",
      "cooking_time.asc": "cooking_time ASC",
      "cooking_time.desc": "cooking_time DESC",
      "prep_time.asc": "prep_time ASC",
      "prep_time.desc": "prep_time DESC",
    };

    let indianFoodDataQuery =
      "SELECT * ,  count(*) OVER() AS full_count FROM indian_foods WHERE 1=1 ";
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

    if (searchTerm) {
      indianFoodDataQuery += ` AND ( name LIKE ${likeTerm} OR state LIKE ${likeTerm} OR region LIKE ${likeTerm} OR ingredients LIKE ${likeTerm} OR diet LIKE ${likeTerm} OR flavor_profile LIKE ${likeTerm} OR course LIKE ${likeTerm} )`;
    }

    if (sortParam && sortMappings[sortParam]) {
      indianFoodDataQuery += ` ORDER BY ${sortMappings[sortParam]}`;
    }

    const indianFoodList = await query(
      `${indianFoodDataQuery} LIMIT ${perPage} OFFSET ${offset}`,
      queryParams
    );

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

/**
 * Fetches distinct ingredients from the 'indian_foods' table.
 * @returns {Promise<object>} - A promise that resolves to the list of ingredients.
 */
async function getIngredientList() {
  try {
    let ingredientDataQuery = `
SELECT DISTINCT TRIM(BOTH '"' FROM JSON_UNQUOTE(JSON_EXTRACT(ingredients, CONCAT('$[', n, ']')))) AS ingredient
FROM indian_foods
CROSS JOIN (
    SELECT 0 AS n UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9 UNION ALL SELECT 10 UNION ALL SELECT 11 UNION ALL SELECT 12 UNION ALL SELECT 13 UNION ALL SELECT 14 UNION ALL SELECT 15
) numbers
WHERE JSON_UNQUOTE(JSON_EXTRACT(ingredients, CONCAT('$[', n, ']'))) IS NOT NULL AND JSON_UNQUOTE(JSON_EXTRACT(ingredients, CONCAT('$[', n, ']'))) != '';

`;

    const ingredientListResponse = await query(ingredientDataQuery);

    if (!ingredientListResponse) return null;

    return ingredientListResponse;
  } catch (error) {
    logError("Error in function::getIngredientList", error);
    return Promise.reject(error);
  }
}

/**
 * search.
 * @param {string} searchTerm Search request for fetch indian foods.
 * @returns {Promise<object>} The food data from database if any.
 */
async function search(searchTerm) {
  try {
    const likeTerm = mysql.escape(`%${searchTerm}%`);

    const searchQuery = `
    SELECT id, name, ingredients, state, region
    FROM indian_foods
    WHERE name LIKE ${likeTerm} OR state LIKE ${likeTerm} OR region LIKE ${likeTerm} OR ingredients LIKE ${likeTerm}
  `;

    const rows = await query(searchQuery);

    return rows;
  } catch (error) {
    logError("Error in function::search:", error);
    throw error;
  }
}

module.exports = {
  getIndianFoodList,
  findFoodById,
  findDishesByIngredients,
  getIngredientList,
  search,
};
