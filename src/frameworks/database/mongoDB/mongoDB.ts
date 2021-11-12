const mongoose = require("mongoose");

const connectToMongoDB = () => {
  mongoose
    .connect(`mongodb://localhost:27017/boardsDB`, {
      useNewUrlParser: true,
    })
    .then(
      () => {},
      (err) => {
        console.info("MongoDB error", err);
      }
    )
    .catch((err) => {
      console.log("ERROR: ", err);
    });

  mongoose.connection.on("connected", () => {
    console.info("Connected to MongoDB!");
  });

  mongoose.connection.on("reconnected", () => {
    console.info("MongoDB Reconnected!");
  });

  mongoose.connection.on("error", (error) => {
    console.error("Error in MongoDB connection: ", error);
  });
};

module.exports = {
  connectToMongoDB,
};

export {};
