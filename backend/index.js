const express = require("express");
const dotenv = require('dotenv')
const connectDB = require("./config/db");
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
const port = process.env.PORT || 8080;


app.listen(port, () => {
    console.log(
      `Node Server Running on Port ${process.env.PORT}`
    );
  });