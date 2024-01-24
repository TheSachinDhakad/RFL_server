const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const userRoutes = require("./Routes/userRoutes");

const app = express();
dotenv.config();
app.use(bodyParser.json());
app.use(cors());

// console.log(mongoose.connect(process.env.MONGO_URI));

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log("connected DB ........");
  } catch (error) {
    console.log("db not connected ....", error.message);
  }
};

connectDb();

// app.get("/", (req, res) => {
//   res.send("api is running");
// });

app.use("/api", userRoutes);

// console.log(process.env.MONGO_URI)
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log("server listening on port"));
