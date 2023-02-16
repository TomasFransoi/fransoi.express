import mongoose from "mongoose";
const productsCollection = "products"
const productSchema = new mongoose.Schema({
    "pid": Number,
    "code": Number,
    "description": String,
    "price": Number,
    "thumbnail": String,
    "stock": Number,
    "status": String,
    "category": String
})
const product = mongoose.model(productsCollection,productSchema)

export default product