const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const app = express();

dotenv.config();
mongoose.set("strictQuery", false);
const mongoDB = process.env.API_MONGODB_URL;
async function main() {
  await mongoose.connect(mongoDB);
}
main().catch((err) => console.log(err));
const corsOptions = {
  origin: process.env.API_ORIGIN_HEADER
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bb application." });
});

require("./app/routes/template.routes")(app);

// set port, listen for requests
const PORT = process.env.API_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
