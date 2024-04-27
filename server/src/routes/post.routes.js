const router = require("express").Router();
const controller = require("../controllers/post.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/", controller.getPosts);
router.get("/:id", controller.getPost);
router.post("/create", authMiddleware, controller.createPost);

module.exports = router;
