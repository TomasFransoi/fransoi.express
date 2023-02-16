import products from "../routes/products.js"
import carts from "../routes/carts.js"
import users from "../routes/users.js"
const router = (app) => {
    app.use("/api/products",products)
    app.use("/api/carts",carts)
    app.use("/api/chat",users)
}
export default router