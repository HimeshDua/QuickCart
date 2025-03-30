import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  userId: { type: String, ref: "User", required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  offerPrice: { type: Number, required: true },
  image: { type: [String], required: true },
  category: { type: String, required: true },
  data: { type: Number, required: true },
})

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;
