//orinal

// import { io } from "socket.io-client";

// let socket;
// //original 5k
// // export const initiateSocket = (userId) => {
// //   socket = io("http://localhost:5000", {
// //     query: { userId },
// //   });
//   export const initiateSocket = (userId) => {
//     socket = io("http://localhost:5000", {
//       query: { userId },
//     });

//   socket.on("connect", () => {
//     console.log("✅ Socket connected:", socket.id);
//   });

//   socket.on("disconnect", () => {
//     console.log("❌ Socket disconnected");
//   });

//   return socket;
// };

// export const getSocket = () => socket;





//gpt 18 june11

// import { io } from "socket.io-client";

// let socket = null;

// // Initialize socket connection
// export const initiateSocket = (userId) => {
//   if (!socket || !socket.connected) {
//     socket = io("http://localhost:8000", {
//       query: { userId },
//       transports: ["websocket"], // Ensure clean connection; fallback removed for simplicity
//     });

//     socket.on("connect", () => {
//       console.log("✅ Socket connected:", socket.id);
//     });

//     socket.on("disconnect", () => {
//       console.log("❌ Socket disconnected");
//     });
//   }
// };

// // Get socket instance
// export const getSocket = () => socket;

// // Disconnect the socket
// export const disconnectSocket = () => {
//   if (socket) {
//     socket.disconnect();
//     socket = null;
//     console.log("🛑 Socket manually disconnected");
//   }
// };


//gpt 22 18 june

// socket.js

// import { io } from "socket.io-client";

// let socket = null;

// export const initiateSocket = (userId) => {
//   if (!userId || socket) return;

//   socket = io("http://localhost:8000", {
//     query: { userId },
//     transports: ["websocket"], // Force only websocket to avoid polling
//   });

//   socket.on("connect", () => {
//     console.log("✅ Socket connected:", socket.id);
//   });

//   socket.on("disconnect", () => {
//     console.log("❌ Socket disconnected");
//   });
// };

// export const getSocket = () => socket;
// export const disconnectSocket = () => {
//   if (socket) {
//     socket.disconnect();
//     socket = null;
//   }
// };



//gpt 33 18 june

import { io } from "socket.io-client";

let socket = null;

// Initialize the socket connection
export const initiateSocket = (userId) => {
  if (socket) return; // Prevent duplicate connections

  socket = io("http://localhost:8000", {
    query: { userId },
    transports: ["websocket"], // Ensures clean connection, avoids polling
  });

  socket.on("connect", () => {
    console.log("✅ Socket connected:", socket.id);
  });

  socket.on("disconnect", () => {
    console.log("❌ Socket disconnected");
  });

  // Optional: handle connection error
  socket.on("connect_error", (err) => {
    console.error("❗ Socket connection error:", err.message);
  });
};

// Get the socket instance
export const getSocket = () => socket;

// Disconnect socket (if needed, e.g., logout)
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    console.log("🔌 Socket manually disconnected");
    socket = null;
  }
};

