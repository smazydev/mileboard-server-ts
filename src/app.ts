const express = require("express");
const bodyParser = require("body-parser");
const mileboardInjection = require("./frameworks/injectionHandler/mileboardInjectionHandler");
const mileboardRouter = require("./controllers/spreadsheet/MongoDB/mileboardController");
const mongoose = require("./frameworks/database/mongoDB/mongoDB");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { Mileboard } = require("./entities/Mileboard"); 

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    transports: ["websocket", "polling"],
    credentials: true,
  }
});

const PORT = process.env.PORT || 8080;
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(bodyParser.json({limit: "100mb"}));
app.use(mileboardRouter);

const start = () => {
  server.listen(PORT, () => {
    console.log("Server listening on: ", PORT);
    mileboardInjection.MileboardServiceSingleton.getInstance();
    mongoose.connectToMongoDB();
  });
};

start();

//************SOCKET CODE STARTS FROM HERE WHICH IS ABSOLUTELY GARBAGE  *******************************/

io.on("connection", (socket) => {
  console.log("a user connected:", socket.id);
  console.log("user count: " + socket.adapter.sids.size);

  socket.on("comments", ({ id, msg }) => {
    socket.to(id).emit("comments", { id: socket.id, msg: msg });
    // console.log(id, msg, "Check Commit");
  });

  socket.on("room-id", (id) => {
    socket.join(id);
    // const newMileboard = new Mileboard({mileboardID:id});
    // const mileboardService = mileboardInjection.MileboardServiceSingleton.getInstance();
    // mileboardService.addMileboard(newMileboard);
    console.log("BUGGA CHUGGA", io.sockets.adapter.rooms.get(id));
    io.to(id).emit("clients", io.sockets.adapter.rooms.get(id));
  });

  socket.on("object-added", ({ obj, roomID, id }) => {
    console.log("object-created");
    socket.to(roomID).emit("new-add", { obj, id });
  });

  socket.on("obj-id", (data) => {
    socket.broadcast.emit("obj-id", data);
  });
  //Object-modified listens for when a shape/text/image moves and or their dimensions are changed.
  socket.on("object-modified", (data) => {
    console.log("Object Modified")
    socket.broadcast.emit("new-modification", data);
  });
  //add-text listens for when a text is added.
  socket.on("text-added", (data) => {
    console.log("Text Created")
    socket.broadcast.emit("text-added", data);
  });
  socket.on("path-created", (data) => {
    //console.log(data);
    console.log("Path Created")
    socket.broadcast.emit("path-created", data);
  });
  socket.on("mouse-positions", (data) => {
    const { x, y } = data;
    let info = { serverX: x, serverY: y };
    socket.broadcast.emit("mouse-positions", info);
  });
  socket.on("object-removed-id", (id) => {
    console.log("object removed");
    socket.broadcast.emit("object-removed-id", id);
  });

  socket.on("image-data", (imgData) => {
    console.log("image-added");
    socket.broadcast.emit("image-data", imgData);
  });

  socket.on("cloned-obj", (obj) => {
    socket.broadcast.emit(obj);
    // console.log(obj);
    // console.log(obj);
  });

  socket.on("save-canvas", (data) => {
    const { id, canvasData } = data;
    // const mileboardService = mileboardInjection.MileboardServiceSingleton.getInstance();
    // mileboardService.updateMileboard(id,canvasData);
  });
  //disconnect listens for socket disonnection events.

  socket.on("disconnect", () => {
    console.log("user disconnected");
    console.log("user count: " + socket.adapter.sids.size);
  });
});

export {};
