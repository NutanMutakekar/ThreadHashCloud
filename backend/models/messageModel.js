import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
	{
		conversationId: { type: mongoose.Schema.Types.ObjectId, ref: "Conversation" },
		sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		text: String,
		seen: {
			type: Boolean,
			default:false,
			// default: true,
		},

		img: {
			type: String,
			default: "",
		},
	},
	{ timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
