const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  _id: {
    type: Types.ObjectId,
  },
  path: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = model("Uploads", schema);
