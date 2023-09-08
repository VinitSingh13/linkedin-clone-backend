const express = require("express");
const verifyToken = require("../middleware/auth");
const {
  addMessage,
  getMessage,
  updateMessageStatus,
  getMessageAndUserDetails
} = require("../controllers/messages");
const router = express.Router();

router.post("/addmsg", verifyToken, addMessage);

router.post("/getmsg", verifyToken, getMessage);

router.put("/updatestatus/:senderId", verifyToken, updateMessageStatus);

router.get("/msgAndUserInfo/:userId", verifyToken, getMessageAndUserDetails)

module.exports = router;
