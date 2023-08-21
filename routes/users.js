const express = require("express");
const {
  getUser,
  getUserFriends,
  addRemoveFriends,
} = require("../controllers/users.js");
const verifyToken = require("../middleware/auth");

const router = express.Router();

/*Read*/
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

/*Update*/
router.patch("/:id/:friendId", verifyToken, addRemoveFriends);

module.exports = router;