import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  item: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true
  },
  quantity: {
    type: Number,
    require: true
  }
});

const Order = mongoose.model("orders", orderSchema);
export default Order;
