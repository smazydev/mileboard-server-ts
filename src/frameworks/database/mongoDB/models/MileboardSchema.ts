const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  mileboardID: String,
  mileboardData: Array,
  readOnlyMileboard: String,
  Comments: Array,
});

const MileboardModel = mongoose.model("Mileboard", schema);

module.exports = {
  MileboardModel,
};

export {};
