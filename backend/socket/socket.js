//chatgpt
// import { Server } from "socket.io";
// import http from "http";
// import express from "express";
// import Message from "../models/messageModel.js";
// import Conversation from "../models/conversationModel.js";

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000", // Replace with your frontend URL
//     methods: ["GET", "POST"],
//   },
// });

// const userSocketMap = {}; // userId: socketId

// // Function to get the recipient's socket ID
// export const getRecipientSocketId = (recipientId) => {
//   return userSocketMap[recipientId];
// };

// // When a new user connects
// io.on("connection", (socket) => {
//   console.log("user connected", socket.id);
//   const userId = socket.handshake.query.userId;

//   // Map the socket ID to user ID
//   if (userId && userId !== "undefined") userSocketMap[userId] = socket.id;
//   io.emit("getOnlineUsers", Object.keys(userSocketMap)); // Emit online users list

//   // Mark messages as seen when the event is triggered
//   socket.on("markMessagesAsSeen", async ({ conversationId, userId }) => {
//     try {
//       // Update unseen messages in the conversation
//       await Message.updateMany(
//         { conversationId: conversationId, seen: false },
//         { $set: { seen: true } }
//       );

//       // Update 'lastMessage.seen' status in the Conversation model
//       await Conversation.updateOne(
//         { _id: conversationId },
//         { $set: { "lastMessage.seen": true } }
//       );

//       // Notify the user that messages have been marked as seen
//       io.to(userSocketMap[userId]).emit("messagesSeen", { conversationId });
//     } catch (error) {
//       console.log(error);
//     }
//   });

//   // Handle sending a message
//   socket.on("sendMessage", async (messageData) => {
//     const { senderId, recipientId, message } = messageData;

//     try {
//       // Find or create a conversation between sender and recipient
//       let conversation = await Conversation.findOne({
//         participants: { $all: [senderId, recipientId] },
//       });

//       if (!conversation) {
//         conversation = new Conversation({
//           participants: [senderId, recipientId],
//           lastMessage: {
//             text: message,
//             sender: senderId,
//           },
//         });
//         await conversation.save();
//       }

//       // Create the new message
//       const newMessage = new Message({
//         conversationId: conversation._id,
//         sender: senderId,
//         text: message,
//       });

//       await newMessage.save();

//       // Update the conversation with the new message
//       await conversation.updateOne({
//         lastMessage: {
//           text: message,
//           sender: senderId,
//         },
//       });

//       // Emit the new message to the recipient if they are online
//       const recipientSocketId = getRecipientSocketId(recipientId);
//       if (recipientSocketId) {
//         io.to(recipientSocketId).emit("newMessage", newMessage);
//       }

//       // Also emit the message to the sender if needed
//       io.to(userSocketMap[senderId]).emit("newMessage", newMessage);

//     } catch (error) {
//       console.log("Error sending message:", error);
//     }
//   });

//   // When a user disconnects
//   socket.on("disconnect", () => {
//     console.log("user disconnected", socket.id);

//     // Remove user from the socket map on disconnect
//     delete userSocketMap[userId];
//     io.emit("getOnlineUsers", Object.keys(userSocketMap)); // Emit updated online users
//   });
// });

// // Export the socket.io instance, server, and app
// export { io, server, app };

//may 27 code gpt part 11

// import { Server } from "socket.io";
// import http from "http";
// import express from "express";
// import Message from "../models/messageModel.js";
// import Conversation from "../models/conversationModel.js";

// const app = express();
// const server = http.createServer(app);

// const io = new Server(server, {
// 	cors: {
// 		origin: "http://localhost:3000",
// 		methods: ["GET", "POST"],
// 	},
// });

// // userId: socketId
// const userSocketMap = {};

// export const getRecipientSocketId = (recipientId) => {
// 	return userSocketMap[recipientId];
// };

// io.on("connection", (socket) => {
// 	console.log("User connected:", socket.id);

// 	const userId = socket.handshake.query.userId;

// 	if (userId && userId !== "undefined") {
// 		userSocketMap[userId] = socket.id;
// 		io.emit("getOnlineUsers", Object.keys(userSocketMap));
// 	}

// 	// 💙 Mark messages as seen
// 	socket.on("markMessagesAsSeen", async ({ conversationId, senderId }) => {
// 		try {
// 			// Update messages as seen
// 			await Message.updateMany(
// 				{ conversationId, receiver: userId, seen: false },
// 				{ $set: { seen: true } }
// 			);

// 			// Update the lastMessage as seen in conversation
// 			await Conversation.updateOne(
// 				{ _id: conversationId },
// 				{ $set: { "lastMessage.seen": true } }
// 			);

// 			console.log(`Messages marked as seen in ${conversationId}`);

// 			// Emit to sender so they can update ticks
// 			const senderSocketId = userSocketMap[senderId];
// 			if (senderSocketId) {
// 				io.to(senderSocketId).emit("messagesSeen", { conversationId });
// 			}
// 		} catch (err) {
// 			console.error("Error marking messages as seen:", err.message);
// 		}
// 	});

// 	// DISCONNECT
// 	socket.on("disconnect", () => {
// 		console.log("User disconnected:", socket.id);
// 		delete userSocketMap[userId];
// 		io.emit("getOnlineUsers", Object.keys(userSocketMap));
// 	});
// });

// export { io, server, app };




//may27 part 22

// import { Server } from "socket.io";
// import http from "http";
// import express from "express";
// import Message from "../models/messageModel.js";
// import Conversation from "../models/conversationModel.js";
// import cors from "cors"; // 🆕 Added gpt


// const app = express();
// const server = http.createServer(app);

// const io = new Server(server, {
// 	cors: {
// 		origin: "http://localhost:3000",
// 		methods: ["GET", "POST"],
// 	},
// });

// // userId => socketId
// const userSocketMap = {};

// export const getRecipientSocketId = (recipientId) => {
// 	return userSocketMap[recipientId];
// };

// io.on("connection", (socket) => {
// 	console.log("User connected:", socket.id);

// 	const userId = socket.handshake.query.userId;

// 	if (userId && userId !== "undefined") {
// 		userSocketMap[userId] = socket.id;
// 		io.emit("getOnlineUsers", Object.keys(userSocketMap));
// 	}

// 	// 📨 SEND MESSAGE
// 	socket.on("sendMessage", async (messageData) => {
// 		try {
// 			console.log("💬 Incoming messageData:", messageData);

// 			const message = new Message({
// 				conversationId: messageData.conversationId,
// 				sender: messageData.sender,
// 				receiver: messageData.receiver, // ✅ ensure this is passed from frontend
// 				text: messageData.text,
// 				img: messageData.img || "",
// 				seen: false,
// 				createdAt: new Date(),
// 			});

// 			const savedMessage = await message.save();

// 			// 🗂 Update last message in conversation
// 			await Conversation.updateOne(
// 				{ _id: messageData.conversationId },
// 				{
// 					$set: {
// 						lastMessage: {
// 							text: messageData.text,
// 							sender: messageData.sender,
// 							seen: false,
// 							createdAt: new Date(),
// 						},
// 					},
// 				}
// 			);

// 			// 🧿 Emit to receiver
// 			const receiverSocketId = userSocketMap[messageData.receiver];
// 			if (receiverSocketId) {
// 				io.to(receiverSocketId).emit("newMessage", savedMessage);
// 			}

// 			// ✅ Emit to sender with seen:true for instant UI update
// 			const senderSocketId = userSocketMap[messageData.sender];
// 			if (senderSocketId) {
// 				io.to(senderSocketId).emit("newMessage", {
// 					...savedMessage.toObject(),
// 					seen: true,
// 				});
// 			}
// 		} catch (err) {
// 			console.error("❌ Error saving or emitting message:", err.message);
// 		}
// 	});

// 	// ✅ MARK AS SEEN
// 	socket.on("markMessagesAsSeen", async ({ conversationId, senderId }) => {
// 		try {
// 			// Update unseen messages not sent by this user
// 			await Message.updateMany(
// 				{ conversationId, sender: { $ne: userId }, seen: false },
// 				{ $set: { seen: true } }
// 			);

// 			await Conversation.updateOne(
// 				{ _id: conversationId },
// 				{ $set: { "lastMessage.seen": true } }
// 			);

// 			console.log(`👁️ Messages marked as seen in conversation ${conversationId}`);

// 			// Notify sender to update blue tick
// 			const senderSocketId = userSocketMap[senderId];
// 			if (senderSocketId) {
// 				io.to(senderSocketId).emit("messagesSeen", { conversationId });
// 			}
// 		} catch (err) {
// 			console.error("❌ Error marking messages as seen:", err.message);
// 		}
// 	});

// 	// ❌ DISCONNECT
// 	socket.on("disconnect", () => {
// 		console.log("User disconnected:", socket.id);
// 		delete userSocketMap[userId];
// 		io.emit("getOnlineUsers", Object.keys(userSocketMap));
// 	});
// });

// export { io, server, app };


//18 june gpt 11
// import express from "express";
// import http from "http";
// import { Server } from "socket.io";

// const app = express();
// const server = http.createServer(app);

// const io = new Server(server, {
// 	cors: {
// 		origin: "http://localhost:3000",
// 		methods: ["GET", "POST"],
// 		credentials: true,
// 	},
// });

// // ✅ Socket event setup
// io.on("connection", (socket) => {
// 	const userId = socket.handshake.query.userId;
// 	console.log("🔌 User connected:", userId, "Socket ID:", socket.id);

// 	socket.on("disconnect", () => {
// 		console.log("🔌 User disconnected:", userId);
// 	});
// });

// export { app, server, io };


//18 june part 22 gpt
// socket/socket.js
// socket/socket.js
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

import Message from "../models/messageModel.js";
import Conversation from "../models/conversationModel.js";

const app = express();

// Add this to allow CORS for frontend
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
  credentials: true
}));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
});

const userSocketMap = {}; // userId: socketId

export const getRecipientSocketId = (recipientId) => {
  return userSocketMap[recipientId];
};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  const userId = socket.handshake.query.userId;

  if (userId !== "undefined") {
    userSocketMap[userId] = socket.id;
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  }

  socket.on("markMessagesAsSeen", async ({ conversationId, userId }) => {
    try {
      await Message.updateMany({ conversationId, seen: false }, { $set: { seen: true } });
      await Conversation.updateOne({ _id: conversationId }, { $set: { "lastMessage.seen": true } });

      io.to(userSocketMap[userId]).emit("messagesSeen", { conversationId });
    } catch (error) {
      console.error("Error updating seen status:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, server, app };







//original
// import { Server } from "socket.io";
// import http from "http";
// import express from "express";
// import Message from "../models/messageModel.js";
// import Conversation from "../models/conversationModel.js";

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
// 	cors: {
// 		origin: "http://localhost:3000",
// 		methods: ["GET", "POST"],
// 	},
// });

// export const getRecipientSocketId = (recipientId) => {
// 	return userSocketMap[recipientId];
// };

// const userSocketMap = {}; // userId: socketId

// io.on("connection", (socket) => {
// 	console.log("user connected", socket.id);
// 	const userId = socket.handshake.query.userId;

// 	if (userId != "undefined") userSocketMap[userId] = socket.id;
// 	io.emit("getOnlineUsers", Object.keys(userSocketMap));

// 	socket.on("markMessagesAsSeen", async ({ conversationId, userId }) => {
// 		try {
// 			await Message.updateMany({ conversationId: conversationId, seen: false }, { $set: { seen: true } });
// 			await Conversation.updateOne({ _id: conversationId }, { $set: { "lastMessage.seen": true } });
// 			io.to(userSocketMap[userId]).emit("messagesSeen", { conversationId });
// 		} catch (error) {
// 			console.log(error);
// 		}
// 	});

// 	socket.on("disconnect", () => {
// 		console.log("user disconnected");
// 		delete userSocketMap[userId];
// 		io.emit("getOnlineUsers", Object.keys(userSocketMap));
// 	});
// });

// export { io, server, app };
