const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  image: {
    type: String,
  },
  date: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
});

module.exports = model("CustomPage", schema);
