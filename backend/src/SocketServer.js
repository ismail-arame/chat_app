//"rooms" are a way to group sockets together that are interested in the same event, often used for broadcasting messages to specific subsets of clients.

let onlineUsers = [];
SocketServer = (socket, io) => {
  /* *_*_*_*_*_*_*_*_*_*_* user joins or opens the application *_*_*_*_*_*_*_*_*_*_* */
  //frontend emits the userId
  socket.on("join", (userId) => {
    // Join Application room
    socket.join(userId);

    //add joined user to online users
    if (!onlineUsers.some((user) => user.userId === userId)) {
      console.log(`user ${userId} is now online`);
      onlineUsers.push({ userId: userId, socketId: socket.id });
    }
    //send online users to frontend
    io.emit("get-online-users", onlineUsers);
    //send socket id
    // io.emit("setup socket", socket.id);
  });

  /* *_*_*_*_*_*_*_*_*_*_* user leaves the application *_*_*_*_*_*_*_*_*_*_* */
  socket.on("leave", (userId) => {
    //Leave the application room
    socket.leave(userId);
    //remove user from online users
    onlineUsers = onlineUsers.filter((user) => user.userId !== userId);
    //send online users to frontend
    io.emit("get-online-users", onlineUsers);
  });

  /* *_*_*_*_*_*_*_*_*_*_* socket disconnect (offline) *_*_*_*_*_*_*_*_*_*_* */
  socket.on("disconnect", () => {
    //remove a user from the onlineUsers array when their socket disconnects
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);

    //send online users to frontend (we have disconnected from the socket this is why we used io instead of socket because socket doesn't exist anymore after disconnection event)
    io.emit("get-online-users", onlineUsers);
  });

  /* *_*_*_*_*_*_*_*_*_*_* Join a Conversation room *_*_*_*_*_*_*_*_*_*_* */
  socket.on("join conversation", (conversationId) => {
    socket.join(conversationId);
    // console.log("user has joined conversation: ", conversation);
  });

  /* *_*_*_*_*_*_*_*_*_*_* send and receive a message *_*_*_*_*_*_*_*_*_*_* */
  socket.on("send message", (message) => {
    // console.log("backend received new message :--> ", message);
    let conversation = message.conversation;
    if (!conversation.users) return;
    conversation.users.forEach((user) => {
      if (user._id === message.sender._id) return;
      console.log("user._id -------------> : ", user._id);
      socket.in(user._id).emit("receive message", message);
    });
  });
};

module.exports = SocketServer;
