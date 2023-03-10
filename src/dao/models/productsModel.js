import mongoose from "mongoose";
import MongoosePaginate from "mongoose-paginate-v2"
const productsCollection = "products"
const productSchema = new mongoose.Schema({
    code: Number,
    description: String,
    price: Number,
    thumbnail: String,
    stock: Number,
    status: String,
    category: String
})
const product = mongoose.model(productsCollection,productSchema)

export default product