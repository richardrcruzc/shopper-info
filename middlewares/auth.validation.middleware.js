const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

exports.validJWTNeeded = (req, res, next) => {
  if (req.headers["authorization"]) {
    try {
      let authorization = req.headers["authorization"].split(" ");
      if (authorization[0] !== "Bearer") {
        return res.status(401).send("token not valid");
      } else {
        req.jwt = jwt.verify(authorization[1], keys.secretOrKey);
        return next();
      }
    } catch (err) {
      return res.status(403).send("token not valid");
    }
  } else {
    return res.status(401).send("not authorized");
  }
};
