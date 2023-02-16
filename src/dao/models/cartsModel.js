import mongoose from "mongoose";
const cartsCollection = "carts"
const cartSchema = new mongoose.Schema({
    "cid":Number,
    "products":Array
})
const cart = mongoose.model(cartsCollection,cartSchema)

export default cart