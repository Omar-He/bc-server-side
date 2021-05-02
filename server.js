require("dotenv").config();
const cors = require("cors");

const express = require("express");
const app = express();
app.use(cors());
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());

const callsRouter = require("./routes/calls");
app.use("/calls", callsRouter);

app.listen(3001, () => console.log("Server Started"));
