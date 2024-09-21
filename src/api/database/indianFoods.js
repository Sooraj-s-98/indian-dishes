const { query } = require("./index");
const { logError } = require("../logger");

/**
 * Fetch the indian foods live from database.
 * @param {object} req Request for fetch indian foods.
 * @returns {Promise<object>} The user data from database if any.
 */
async function getIndianFoodList(req) {
  try {

  const timeGte = req.query['time[gte]'];
  const timeLte = req.query['time[lte]'];
  const originState = req.query['origin[state]'];
  const diet = req.query.diet;

  let indianFoodDataQuery = 'SELECT * FROM indian_foods WHERE 1=1';
  let queryParams = [];

  if (timeGte) {
    indianFoodDataQuery += ' AND cooking_time >= ?';
    queryParams.push(timeGte);
  }

  if (timeLte) {
    indianFoodDataQuery += ' AND cooking_time <= ?';
    queryParams.push(timeLte);
  }

  if (originState) {
    indianFoodDataQuery += ' AND origin_state = ?';
    queryParams.push(originState);
  }

  if (diet) {
    indianFoodDataQuery += ' AND diet = ?';
    queryParams.push(diet);
  }

   
    const indianFoodList = await query(indianFoodDataQuery, queryParams)

    if (!indianFoodList) return null;
   
    return indianFoodList
  } catch (error) {
    logError("Error in function::getIndianFoodList", error);
    return Promise.reject(error);
  }
}


/**
 * Find food by name from the database.
 * @param {string} foodName Name of the food to find.
 * @returns {Promise<object>} The food data from database if any.
 */
async function findFoodByName(foodName) {
    try {
        if (!foodName) {
            throw new Error('Food name is required');
        }

        let foodDataQuery = 'SELECT * FROM indian_foods WHERE name LIKE ?';
        let queryParams = [`%${foodName}%`];

        const [rows] = await query(foodDataQuery, queryParams);
        return rows ? rows : 'No matching food found';
    } catch (error) {
        console.error('Error finding food by name:', error);
        throw error; 
    }
}



module.exports = {
  getIndianFoodList,
  findFoodByName,
};
