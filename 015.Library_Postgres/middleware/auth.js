const jwt = require('jsonwebtoken');
const envVar = require('../config/index');

module.exports = function (req, res, next) {
  const token = localStorage.token;
  if (!token) {
    return res.status(401).send("Token yo`q");
  }

  try{
    const decoded = jwt.verify(token, envVar.SECRET_CODE);
    req.user = decoded;
    next();
  }
  catch(ex) {
    return res.status(400).send("Yaroqsiz token");
  }
  
}
