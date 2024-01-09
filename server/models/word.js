const mongoose = require("mongoose");

const WordSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  meaning: {
    type: String,
    required: true,
  },
  example: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Word", WordSchema);
