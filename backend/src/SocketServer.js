//"rooms" are a way to group sockets together that are interested in the same event, often used for broadcasting messages to specific subsets of clients.

SocketServer = (socket) => {
  // user joins or opens the application
  //frontend emits the userId
  socket.on("join", (userId) => {
    console.log("user has joined : ", userId);
    // Join Application room
    // socket.join(userId);
    socket.join(userId);
  });

  //Join a Conversation room
  socket.on("join conversation", (conversationId) => {
    socket.join(conversationId);
    // console.log("user has joined conversation: ", conversation);
  });

  //send and receive message
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
