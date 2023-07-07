const express = require("express");
const dotenv = require("dotenv");

const morgan = require("morgan");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const createHttpError = require("http-errors");
const routes = require("./routes/index");

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

//Cross-Origin Resource Sharing
app.use(cors());

//routes
app.use("/", routes);

app.use(async (req, res, next) => {
  next(createHttpError.NotFound("This route does not exist"));
});

//handling http errors
app.use(async (err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

module.exports = app;
