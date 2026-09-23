require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

connectDB().then(() => {
  app.listen(8080, () => {
    console.log("Server is running on port 8080");
  });
});