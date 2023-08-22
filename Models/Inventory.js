import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
  sku: {
    type: String,
    require: true,
  },
  description: {
    type: String,
  },
  instock: {
    type: Number
  }
});

const Inventory = mongoose.model("inventories", inventorySchema);
export default Inventory;
