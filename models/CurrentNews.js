const { Schema, model } = require("mongoose");

const schema = new Schema({
  _id: {
    type: String,
  },
});

module.exports = model("CurrentNews", schema);
