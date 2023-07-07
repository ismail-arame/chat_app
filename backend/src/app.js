const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const fileUpload = require("express-fileupload");
const cors = require("cors");

//dot env config
dotenv.config();

const app = express();

//Morgan
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

//Helmet
app.use(helmet());

//parse json from body and url middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//sanitize mongo request data
app.use(mongoSanitize());
app.get("/", (req, res) => {
  res.status(200).send("hello from the end of the world");
});

//cookie parser
app.use(cookieParser());

//gzip compression
app.use(compression());

//file upload
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.use(cors());

module.exports = app;
