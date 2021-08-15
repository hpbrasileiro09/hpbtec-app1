
require('dotenv/config');

const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    res.json({ message: "NOK", detail: "A token is required for authentication" }); 
    //res.json(JSON.stringify({ message: "NOK", detail: "A token is required for authentication" })); 
    //return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    res.json({ message: "NOK", detail: "Invalid Token" }); 
    //res.json(JSON.stringify({ message: "NOK", detail: "Invalid Token" })); 
    //return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;