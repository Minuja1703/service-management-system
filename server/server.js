const dotenv = require("dotenv");
dotenv.config();

const app = require("./src/app");
const connectDb = require("./src/config/db");

connectDb();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server is running on http://localhost:3000");
});
