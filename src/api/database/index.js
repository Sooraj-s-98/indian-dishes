const mysql = require("mysql");
const { logError, logInfo } = require("../logger");

const { DATABASE_CONNECTION_LIMIT } = process.env;
const { DATABASE_HOST, DATABASE_PORT } = process.env;
const { DATABASE_NAME } = process.env;
const { DATABASE_USER } = process.env;
const { DATABASE_PASSWORD } = process.env;

/**
 * The database pool instance.
 */
let pool;

/**
 * Get the connection pool.
 * This will return the database connection pool.
 */
function getPool() {
  if (!pool) startConnection();
  return pool;
}

/**
 * Initialze the database pool.
 * This will try create a database connection pool.
 */
function startConnection() {
  pool = mysql.createPool({
    connectionLimit: parseInt(DATABASE_CONNECTION_LIMIT),
    host: DATABASE_HOST,
    database: DATABASE_NAME,
    user: DATABASE_USER,
    password: DATABASE_PASSWORD,
    port: parseInt(DATABASE_PORT),
  });
}

/**
 * Test the database connection.
 * If unable to connect to database, a rejected promise will be returned.
 */
function testConnection() {
  logInfo("Trying to intiate test connection");
  const pool = getPool();
  return new Promise((resolve, reject) => {
    pool.getConnection((error, connection) => {
      if (error) {
        logError("Database: Error in function::testConnection", error);
        return reject("Unable to connect to database");
      }
      logInfo(
        "Database: Successfully connected to database, releasing connection"
      );
      connection.release();
      return resolve();
    });
  });
}

/**
 * Query the database using `_pool`.
 * @param {string} query The query to execute in the database.
 * @param {any[]} params The parameters to pass for the query.
 * @returns {Promise<any>} The response obtained from running the query in the database.
 */
function query(query, ...params) {
  return new Promise((resolve, reject) => {
    pool.query(query, params, (error, results) => {
      if (error) {
        logError("Database: Error in function::query", error);
        return reject("Unable to perform query");
      }
      return resolve(results);
    });
  });
}

/**
 * Close the database `_pool`.
 */
function closePool() {
  logInfo("Database: Closing the database pool");
  pool.end((error) => {
    if (error) logError("Database: Error in function::closePool", error);
  });
}

module.exports = { testConnection, query, closePool };
