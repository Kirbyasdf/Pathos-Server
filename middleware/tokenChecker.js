const jwt = require("jsonwebtoken")
const User = require("../models/User")


exports.tokenChecker = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  } 
  if (!token) {
    return res.status(401).json({msg: "you ain't go no token son"})
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECERT);
 
    req.user = await User.selectById(id);

    next();
  } catch (err) {
    console.warn(err)
  }
}

