//Abb humme iss router main contests fetch karwaane hain
const { Router } = require("express");
const getUpcomingContests = require("../controllers/fetchContestController.js");

const contestFetchRouter = Router();
contestFetchRouter.get("/fetch-contest", getUpcomingContests);

module.exports = contestFetchRouter;
