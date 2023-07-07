const mongoose = require("mongoose");
const app = require("./app");
const logger = require("./configs/logger.config");

//env variables
const { DATABASE_URL } = process.env;
const PORT = process.env.PORT || 8000;

//mongoDb debug mode
if (process.env.NODE_ENV !== "production") {
  mongoose.set("debug", true);
}

//mongoDb connection
mongoose
  .connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info("connected to MongoDB successfully.");
  })
  .catch((error) => {
    logger.error(`error connecting to mongodb ${error}`);
    //exiting the process because the connection to Database is important
    process.exit(1);
  });

let server;
server = app.listen(PORT, () => {
  logger.info(`Server is listening on port ${PORT}`);
  // throw new Error("server error .");
});

const exitHandler = () => {
  if (server) {
    logger.info("server closed.");
    //stopping the process gracefully
    process.exit(1);
  } else {
    process.exit(1);
  }
};

//handle server error
const unExpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

//listening for process event
process.on("uncaughtException", unExpectedErrorHandler);
process.on("unhandledRejection", unExpectedErrorHandler);

//SIGTERM (terminate process gracefully)
process.on("SIGTERM", () => {
  if (server) {
    logger.info("server closed.");
    process.exit(1);
  }
});
