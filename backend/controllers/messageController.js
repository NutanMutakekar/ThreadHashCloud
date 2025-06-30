//chatgpt 
import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";
import { getRecipientSocketId, io } from "../socket/socket.js";
import { v2 as cloudinary } from "cloudinary";

// Send a message
async function sendMessage(req, res) {
  try {
    const { recipientId, message } = req.body;
    let { img } = req.body;
    const senderId = req.user._id;

    // Find or create conversation between sender and recipient
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, recipientId] },
    });

    if (!conversation) {
      conversation = new Conversation({
        participants: [senderId, recipientId],
        lastMessage: {
          text: message,
          sender: senderId,
        },
      });
      await conversation.save();
    }

    // If image exists, upload to Cloudinary
    if (img) {
      const uploadedResponse = await cloudinary.uploader.upload(img);
      img = uploadedResponse.secure_url;
    }

    // Create a new message
    const newMessage = new Message({
      conversationId: conversation._id,
      sender: senderId,
      text: message,
      img: img || "",
    });

    // Save message and update conversation with the last message
    await Promise.all([
      newMessage.save(),
      conversation.updateOne({
        lastMessage: {
          text: message,
          sender: senderId,
        },
      }),
    ]);

    // Emit the new message to the recipient via socket if they are online
    const recipientSocketId = getRecipientSocketId(recipientId);
    if (recipientSocketId) {
      io.to(recipientSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get messages in a conversation
async function getMessages(req, res) {
  const { otherUserId } = req.params;
  const userId = req.user._id;
  try {
    // Find the conversation between the current user and the other user
    const conversation = await Conversation.findOne({
      participants: { $all: [userId, otherUserId] },
    });

    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    // Retrieve all messages from that conversation
    const messages = await Message.find({
      conversationId: conversation._id,
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get all conversations for the current user
async function getConversations(req, res) {
  const userId = req.user._id;
  try {
    // Find all conversations for the current user
    const conversations = await Conversation.find({ participants: userId }).populate({
      path: "participants",
      select: "username profilePic",
    });

    // Remove the current user from the participants list in each conversation
    conversations.forEach((conversation) => {
      conversation.participants = conversation.participants.filter(
        (participant) => participant._id.toString() !== userId.toString()
      );
    });

    res.status(200).json(conversations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export { sendMessage, getMessages, getConversations };









//original one
// import Conversation from "../models/conversationModel.js";
// import Message from "../models/messageModel.js";
// import { getRecipientSocketId, io } from "../socket/socket.js";
// import { v2 as cloudinary } from "cloudinary";

// async function sendMessage(req, res) {
// 	try {
// 		const { recipientId, message } = req.body;
// 		let { img } = req.body;
// 		const senderId = req.user._id;

// 		let conversation = await Conversation.findOne({
// 			participants: { $all: [senderId, recipientId] },
// 		});

// 		if (!conversation) {
// 			conversation = new Conversation({
// 				participants: [senderId, recipientId],
// 				lastMessage: {
// 					text: message,
// 					sender: senderId,
// 				},
// 			});
// 			await conversation.save();
// 		}

// 		if (img) {
// 			const uploadedResponse = await cloudinary.uploader.upload(img);
// 			img = uploadedResponse.secure_url;
// 		}

// 		const newMessage = new Message({
// 			conversationId: conversation._id,
// 			sender: senderId,
// 			text: message,
// 			img: img || "",
// 		});

// 		await Promise.all([
// 			newMessage.save(),
// 			conversation.updateOne({
// 				lastMessage: {
// 					text: message,
// 					sender: senderId,
// 				},
// 			}),
// 		]);

// 		const recipientSocketId = getRecipientSocketId(recipientId);
// 		if (recipientSocketId) {
// 			io.to(recipientSocketId).emit("newMessage", newMessage);
// 		}

// 		res.status(201).json(newMessage);
// 	} catch (error) {
// 		res.status(500).json({ error: error.message });
// 	}
// }

// async function getMessages(req, res) {
// 	const { otherUserId } = req.params;
// 	const userId = req.user._id;
// 	try {
// 		const conversation = await Conversation.findOne({
// 			participants: { $all: [userId, otherUserId] },
// 		});

// 		if (!conversation) {
// 			return res.status(404).json({ error: "Conversation not found" });
// 		}

// 		const messages = await Message.find({
// 			conversationId: conversation._id,
// 		}).sort({ createdAt: 1 });

// 		res.status(200).json(messages);
// 	} catch (error) {
// 		res.status(500).json({ error: error.message });
// 	}
// }

// async function getConversations(req, res) {
// 	const userId = req.user._id;
// 	try {
// 		const conversations = await Conversation.find({ participants: userId }).populate({
// 			path: "participants",
// 			select: "username profilePic",
// 		});

// 		// remove the current user from the participants array
// 		conversations.forEach((conversation) => {
// 			conversation.participants = conversation.participants.filter(
// 				(participant) => participant._id.toString() !== userId.toString()
// 			);
// 		});
// 		res.status(200).json(conversations);
// 	} catch (error) {
// 		res.status(500).json({ error: error.message });
// 	}
// }

// export { sendMessage, getMessages, getConversations };
