const express = require("express");
const verifyToken = require("../middleware/auth");
const {addMessage, getMessage} = require("../controllers/messages");
const router = express.Router();


router.post("/addmsg",verifyToken,addMessage);

router.post("/getmsg",verifyToken,getMessage);

module.exports = router;