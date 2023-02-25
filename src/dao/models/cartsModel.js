import mongoose from "mongoose";
const cartsCollection = "carts"
const cartSchema = new mongoose.Schema({
    products: {
        type: [
              {
                product: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: 'product'
                }
              }
            ],
            default: []
          }
})
const cart = mongoose.model(cartsCollection,cartSchema)
cartSchema.pre("findOne", function(){
  this.populate("products.product")
}
)
export default cart