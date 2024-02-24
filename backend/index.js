const express = require("express");
const dotenv = require('dotenv')
const connectDB = require("./config/db");
const cors = require("cors");
const Student = require("./models/student");
const Division = require("./models/division");
const Batch = require("./models/batch");
const MentorshipGrp = require("./models/mentorshipGrp");
const Subject = require("./models/assignments");
const Teacher = require("./models/division");
const Assignment = require("./models/student");

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