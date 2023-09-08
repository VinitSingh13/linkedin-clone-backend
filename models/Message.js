const mongoose = require("mongoose");

const msgSchema = new mongoose.Schema(
  {
    message: {
      text: {
        type: String,
        required: true,
      },
    },
    users: Array,
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status:{
      type:String,
      default:"unseen"
    }
  },
  { timestamps: true }
);

const Message = mongoose.model("Message",msgSchema);
module.exports = Message;
