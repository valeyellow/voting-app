const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();

require("./config/db");

const poll = require("./routes/poll");

// Set public folder
app.use(express.static(path.join(__dirname, "public")));

// body parser
app.use(express.json());
app.use(express.urlencoded());

// Enable CORS
app.use(cors());

app.use("/poll", poll);

const port = 3000;

// Start the server
app.listen(port, () => {
  console.log(`Server up and running on port ${port}`);
});
