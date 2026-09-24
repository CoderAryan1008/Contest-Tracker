//Abb humme yeh ek middleware banana hain jo find karega ki kya humme user ko aage send karna hain kya
const jwt = require("jsonwebtoken");
const blacklistModel = require("../models/blacklist.js");
async function AuthUser(req, res, next) {
  //Abb humme yaahan sabse pahle token ko extract karna hain from the cookie
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "No token was found !!!"
    })
  }
  //Abb humem check karna hain ki token 
  const istokenblacklisted = await blacklistModel.findOne({ token });
  if (istokenblacklisted) {
    //Yaani yeh token blacklisted hain
    return res.status(401).json({
      message: "Token is blacklisted..."

    })
  }

  //Abb humme token ko check karna hain ki kya woh sahi hain
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded; //Yaani yeh nayi field add kardo
    next();//Yaani abb tu aage ja sakta hain
  }
  catch (err) {
    return res.status(401).json({
      message: "Invalid User ...."

    })
  }
}
module.exports = AuthUser;