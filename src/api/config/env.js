const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: path.resolve(__dirname, "../../", process.env.DOTENV_CONFIG_PATH),
});
