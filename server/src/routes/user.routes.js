const router = require("express").Router();
const controller = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/login", controller.loginUser);
router.post("/create", controller.createUser);

router.get("/:id", authMiddleware, controller.getUser);
router.put("/update", authMiddleware, controller.updateUser);

module.exports = router;
