//Abb humme iss endpoint pe user ki info nikalwaani hain from the codeforces api
const { Router } = require("express");
const AuthUser = require("../middlewares/auth.middleware.js");
const fetchUserRouter = Router();
const { linkCfHandle, getCfProfile } = require("../controllers/cfControllers.js");
fetchUserRouter.post("/link", AuthUser, linkCfHandle);
fetchUserRouter.get("/profile", AuthUser, getCfProfile);

module.exports = fetchUserRouter;
