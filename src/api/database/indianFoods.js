const { query } = require("./index");
const { logError } = require("../logger");

/**
 * Fetch the indian foods live from database.
 * @param {object} request Request for fetch indian foods.
 * @param {number} offset offset of the indian foods.
 * @param {number} perPage offset of the indian foods.
 * @returns {Promise<object>} The user data from database if any.
 */
async function getIndianFoodList(request, offset, perPage) {
  try {
   
    const indianFoodDataQuery = `SELECT * from indian_foods`;
    const indianFoodList = await query(indianFoodDataQuery)

    if (!indianFoodList) return null;
   
    return indianFoodList
  } catch (error) {
    logError("Error in function::getIndianFoodList", error);
    return Promise.reject(error);
  }
}



module.exports = {
  getIndianFoodList,
};
