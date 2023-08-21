//"rooms" are a way to group sockets together that are interested in the same event, often used for broadcasting messages to specific subsets of clients.

let onlineUsers = [];
SocketServer = (socket, io) => {
  /* *_*_*_*_*_*_*_*_*_*_* user joins or opens the application *_*_*_*_*_*_*_*_*_*_* */
  //frontend emits the userId
  socket.on("join", (userId) => {
    // Join Application room
    socket.join(userId);

    /* ************ add joined user to online users ************ */
    global.onlineUsersBackend.set(userId, socket.id);
    console.log(
      "online users backend at socket server : ",
      global.onlineUsersBackend
    );
    if (!onlineUsers.some((user) => user.userId === userId)) {
      console.log(`user ${userId} is now online`);
      onlineUsers.push({ userId: userId, socketId: socket.id });
    }
    //send online users to frontend
    io.emit("get-online-users", onlineUsers);
  });

  /* *_*_*_*_*_*_*_*_*_*_* user leaves the application *_*_*_*_*_*_*_*_*_*_* */
  socket.on("leave", (userId) => {
    //Leave the application room
    socket.leave(userId);
    //remove user from online users
    onlineUsers = onlineUsers.filter((user) => user.userId !== userId);
    //remove the user from the onlineUsersBackend global Map
    global.onlineUsersBackend.delete(userId);
    //send online users to frontend
    io.emit("get-online-users", onlineUsers);
  });

  /* *_*_*_*_*_*_*_*_*_*_* socket disconnect (offline) *_*_*_*_*_*_*_*_*_*_* */
  socket.on("disconnect", () => {
    //remove a user from the onlineUsers array when their socket disconnects
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);

    //remove the user from the onlineUsersBackend global Map
    for (const [userId, socketId] of global.onlineUsersBackend) {
      if (socketId === socket.id) {
        global.onlineUsersBackend.delete(userId);
        break; // Assuming each socket.id is unique, exit loop after deletion
      }
    }

    //send online users to frontend (we have disconnected from the socket this is why we used io instead of socket because socket doesn't exist anymore after disconnection event)
    io.emit("get-online-users", onlineUsers);
  });

  /* *_*_*_*_*_*_*_*_*_*_* Join a Conversation room *_*_*_*_*_*_*_*_*_*_* */
  socket.on("join conversation", ({ conversationId, receiverId, userId }) => {
    socket.join(conversationId);

    // Notify the sender that the message has been seen
    // (he is called reciever here because the other user who opened the conversationChat)
    console.log("reciever id ::: ", receiverId, userId);
    socket
      .in(receiverId)
      .emit("message seen notification", { userId, conversationId });
  });

  /* *_*_*_*_*_*_*_*_*_*_* send and receive a message *_*_*_*_*_*_*_*_*_*_* */
  socket.on("send message", (message) => {
    // console.log("backend received new message :--> ", message);
    let conversation = message.conversation;
    if (!conversation?.users) return;
    conversation.users.forEach((user) => {
      if (user._id === message.sender._id) return;
      console.log("user._id -------------> : ", user._id);
      socket.in(user._id).emit("receive message", message);
    });
  });

  /* *_*_*_*_*_*_*_*_*_*_* reciever has seen a message *_*_*_*_*_*_*_*_*_*_* */
  socket.on("seen message", ({ senderId, receiverId, conversationId }) => {
    console.log(
      `receiver ${receiverId} has seen the message from sender ${senderId}`
    );
    // Notify the sender that the message has been seen
    socket
      .in(senderId)
      .emit("message seen notification", { receiverId, conversationId });
  });

  /* *_*_*_*_*_*_*_*_*_*_* Typing *_*_*_*_*_*_*_*_*_*_* */
  socket.on("typing", (conversationId) => {
    console.log("typing in ... ", conversationId);
    socket.in(conversationId).emit("typing", conversationId);
  });

  socket.on("stop typing", (conversationId) => {
    console.log("stopped typing in ... ", conversationId);
    socket.in(conversationId).emit("stop typing");
  });
};

module.exports = SocketServer;
