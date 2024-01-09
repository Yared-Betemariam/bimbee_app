const mongoose = require("mongoose");

const UserPerformanceSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    focusList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Word",
      },
    ],
  },
  { timeStamps: true }
);

module.exports = mongoose.model("UserPeformance", UserPerformanceSchema);
