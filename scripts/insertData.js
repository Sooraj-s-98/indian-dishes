const mysql = require("mysql");
const csv = require("fast-csv");
const fs = require("fs");
const { dev: config } = require("./config.json");

// Database connection configuration
const connection = mysql.createConnection(config);

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to the database.");

  // Create table
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS indian_foods (
      id INT AUTO_INCREMENT,
      name VARCHAR(255),
      ingredients JSON,
      diet VARCHAR(255) DEFAULT NULL,
      prep_time INT,
      cook_time INT,
      flavor_profile VARCHAR(255) DEFAULT NULL,
      course VARCHAR(255) DEFAULT NULL,
      state VARCHAR(255) DEFAULT NULL,
      region VARCHAR(255) DEFAULT NULL,
       PRIMARY KEY (id)
    )`;

  connection.query(createTableQuery, (err, result) => {
    if (err) throw err;
    console.log("Table created or already exists.");

    // Insert data from CSV
    fs.createReadStream(`${__dirname}/../csv/indian_food.csv`)
      .pipe(csv.parse({ headers: true }))
      .on("data", (row) => {

        Object.keys(row).forEach(key => {
          if (row[key] === '-1') {
            row[key] = null; 
          }
        });

        if (row.ingredients) {
          row.ingredients = JSON.stringify(
            row.ingredients.split(",").map((ingredient) => ingredient.trim().toLowerCase())
          );
        }
        const insertQuery = "INSERT INTO indian_foods SET ?";
        connection.query(insertQuery, row, (err, result) => {
          if (err) throw err;
          console.log(`Row inserted with ID: ${result.insertId}`);
        });
      })
      .on("end", () => {
        console.log("CSV file successfully processed and data inserted.");
        connection.end();
      });
  });
});
