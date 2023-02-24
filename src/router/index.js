import products from "../controlers/products.js"
import carts from "../controlers/carts.js"
import users from "../controlers/users.js"
const router = (app) => {
    app.use("/api/products",products)
    app.use("/api/carts",carts)
    app.use("/api/chat",users)
}
export default router