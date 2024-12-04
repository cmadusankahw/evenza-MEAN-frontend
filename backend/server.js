const app = require("./src/app");
const debug = require("debug")("node-angular");
const http = require("http");
const socketIO = require('socket.io');

const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  debug("Listening on " + bind);
};

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);

const io = socketIO(server);

// use socket-io to recieve messages
io.on('connection', (socket) => {

  console.log('new connection made.');

  // hadling user joininig chat room
  socket.on('join', function (data) {
    socket.join(data.room);
    console.log(data.user + 'joined the room : ' + data.room);
    socket.broadcast.to(data.room).emit('new user joined', { user: data.user, message: 'has joined this room.' });
  });

  // handling user leaving the chat room
  socket.on('leave', function (data) {
    console.log(data.user + 'left the room : ' + data.room);
    socket.broadcast.to(data.room).emit('left room', { user: data.user, message: 'has left this room.' });
    socket.leave(data.room);
  });

  // handeling realtime messaging in chat
  socket.on('message', function (data) {

    io.in(data.room).emit('new message', { user: data.user, message: data.message });
  })

  // create booking notification
  socket.on('booking-add', function (data) {
    io.emit('booking add', { service: data.service, fromDate: data.fromDate, toDate: data.toDate });
  })

  socket.on('booking-state', function (data) {
    io.emit('booking state', { bookingId: data.bookingId, service: data.service, state: data.state });
  })

  // create appointment notification
  socket.on('appoint-add', function (data) {
    io.emit('appoint add', { service: data.service, appointedDate: data.appointedDate, appointedTime: data.appointedTime });
  })

  socket.on('appoint-state', function (data) {
    io.emit('appoint state', { appointId: data.appointId, service: data.service, state: data.state });
  })

  // create order notification
  socket.on('order-add', function (data) {
    io.emit('order add', { product: data.product, quantity: data.quantity });
  })

  socket.on('order-state', function (data) {
    io.emit('order state', { orderId: data.orderId, product: data.product, state: data.state });
  })


});

// listen to the http server
server.listen(port, () => {
  console.log("Node JS Server is running on port " + port.toString())
});
