import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    catergory: String,
    rating: Number,
    supply: Number
},
    { timestamps: true }
)
const Product = mongoose.model("products", productSchema);

export default Product