//Abb humme yaahan saare routes mention karne hain for the login , register and logout of user
const { Router } = require("express");
const { googleLogin, googleCallback, logout, getmecontroller } = require('../controllers/auth.controller.js');
const AuthUser = require("../middlewares/auth.middleware.js");
const AuthRouter = Router();//Abb yeh saare routes of auth ko handle karega
AuthRouter.get('/google', googleLogin);
AuthRouter.get('/google/callback', googleCallback);
AuthRouter.post('/logout', AuthUser, logout);
AuthRouter.get('/get-me', AuthUser, getmecontroller);//Isse hum check karenge ki user aagar exist karta hain toh phir mujhe check karke uski info deena 
module.exports = AuthRouter;
