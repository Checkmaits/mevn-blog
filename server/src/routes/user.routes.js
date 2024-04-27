const router = require("express").Router();
const controller = require("../controllers/user.controller");

// TODO: Admin-based roles?

router.get("/:id", controller.getUser);
router.post("/create", controller.createUser);

module.exports = router;
