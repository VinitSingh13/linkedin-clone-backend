const express = require("express");
const {getFeedPosts, getUserPosts, likePosts} = require("../controllers/posts");
const verifyToken = require("../middleware/auth")
const router = express.Router();


/*Read*/
router.get("/",verifyToken,getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts)

/*Update*/
router.patch("/:id/like", verifyToken, likePosts);

module.exports = router;