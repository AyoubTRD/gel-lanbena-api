const { model, Schema } = require("mongoose");

const requestSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      default: 1
    },
    address: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = model("request", requestSchema);
