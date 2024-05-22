const teamController = require("../controllers/team");

const router = require("express").Router();
router.get(["/team"], teamController.teamView);

module.exports = router;
