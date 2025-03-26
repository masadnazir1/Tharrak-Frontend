const { Server } = require("socket.io");

const connectedUsers = new Map(); // Store connected users

const initializeWebSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000", // Update with frontend URL
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Register a user with their ID
    socket.on("registerUser", (userId) => {
      connectedUsers.set(userId, socket.id);
      console.log(`User ${userId} registered with socket ${socket.id}`);
    });

    // Send notification to all users
    socket.on("sendNotification", (data) => {
      console.log("Broadcasting Notification:", data);
      io.emit("notification", data); // Broadcast to all connected users
    });

    // Send notification to a specific user
    socket.on("sendPrivateNotification", ({ userId, message }) => {
      const socketId = connectedUsers.get(userId);
      if (socketId) {
        io.to(socketId).emit("notification", { message });
      }
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
      connectedUsers.forEach((value, key) => {
        if (value === socket.id) {
          connectedUsers.delete(key);
        }
      });
    });
  });

  return io;
};

module.exports = { initializeWebSocket };
