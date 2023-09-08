const Message = require("../models/Message");

const getMessage = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    const messages = await Message.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
    res.json(projectedMessages);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const getMessageAndUserDetails = async (req, res, next) => {
  try {
    const {userId} = req.params;
    const data = await Message.aggregate([
      {
        $match: { status: "unseen", "users.1":`${userId}` },
      },
      { $sort: { createdAt: -1 } },
      {
        $lookup: {
          from: "users",
          localField: "sender",
          foreignField: "_id",
          as: "userInfo",
        },
      },
      {
        $group: {
          _id: "$sender",
          count: { $sum: 1 },
          first: { $first: "$$ROOT" },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await Message.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    if (data) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const updateMessageStatus = async (req, res, next) => {
  try {
    const {senderId} = req.params;
    const data = await Message.updateMany(
      { status: "unseen", sender:`${senderId}`},
      { $set: { status: "seen" } }
    );
    res.status(200).json(data);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

module.exports = {
  getMessage,
  addMessage,
  updateMessageStatus,
  getMessageAndUserDetails,
};
