import products from "../routes/products.js"
import carts from "../routes/carts.js"
const router = (app) => {
    app.use("/api/products",products)
    app.use("/api/carts",carts)
}
export default router