//"rooms" are a way to group sockets together that are interested in the same event, often used for broadcasting messages to specific subsets of clients.

SocketServer = (socket) => {
  // user joins or opens the application
  //frontend emits the userId
  socket.on("join", (user) => {
    // Join Application room
    socket.join(user);

    //Join a Conversation room
    socket.on("join conversation", (conversation) => {
      socket.join(conversation);
      console.log("user has joined conversation: ", conversation);
    });
  });
};

module.exports = SocketServer;
