require("dotenv").config();
require("express-async-errors");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

const notFound = require("./middlewares/not-found");
const errorHandler = require("./middlewares/error-handler");
const PORT = process.env.PORT;
const connectDB = require("./db/connectDB");
const session = require("express-session");
const UserRouter = require("./routes/users");
const MongoStore = require("connect-mongo");
const authenticationCheck = require("./middlewares/auth");
const WordRouter = require("./routes/words");
const MongoURI = process.env.MONGO_URI;

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
    rolling: true,
    store: MongoStore.create({
      mongoUrl: MongoURI,
    }),
  })
);

app.use("/api/auth", UserRouter);
app.use("/api/words", authenticationCheck, WordRouter);

app.get("/", (req, res) => {
  res.status(200).json({ message: "welcome to bimbeeAPI" });
});

app.use(notFound);
app.use(errorHandler);

const start = async () => {
  try {
    await connectDB(MongoURI);
    console.log("Mongo: Database connected");
    app.listen(PORT, console.log(`Server running at port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};
start();
