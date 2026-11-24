const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Order",
  new mongoose.Schema(
    {
      userId: {
        type: String,
        required: true
      },
      userEmail: String,
      items: Array,
      total: Number,
      status: {
        type: String,
        default: "Pending"
      }
    },
    { timestamps: true }
  )
);
