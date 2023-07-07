exports.register = async (req, res, next) => {
  try {
    res.send(req.body);
  } catch (error) {
    //error will be passed to createHttpError package
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    res.send("hello from login api");
  } catch (error) {
    next(error);
  }
};

exports.logout = async (req, res, next) => {
  try {
    res.send("hello from logout api");
  } catch (error) {
    next(error);
  }
};
exports.refreshToken = async (req, res, next) => {
  try {
    res.send("hello from refreshToken api");
  } catch (error) {
    next(error);
  }
};
