import { Router } from "express";
import Contenedor from "../dao/manejodeDeCarts.js";
const carts = new Contenedor("../data/carts.json","../data/productos.json")
const router = Router();

router.post("/",async(req,res) =>{
    carts.createCart()
    res.json({message:"carrito creado"})
})
router.get("/:cid",async(req,res) =>{
    const cid = req.params.cid;
    const cart = await carts.getById(cid);
    res.render("cart",{cart:cart})
    res.json({productos:cart.productos})
});

router.put("/:cid/product/:pid/:cuantity",async(req,res)=>{
    const cid = req.params.cid;
    const pid = req.params.pid;
    const cuantity = req.params.pid;
    carts.updateCart(cid,pid,cuantity)
})
router.delete("/:cid/products:pid",async()=>{
    const cid = req.params.cid;
    const pid = req.params.pid;
    carts.delateProduct(cid,pid)
})
router.put("/:cid/products/:pid", async()=>{
    const cid = req.params.cid;
    const pid = req.params.pid;
    const {cuantity} = req.body
    carts.updateCuantity(cuantity,pid,cid)
})
router.delete("/:cid", async()=>{
    const cid = req.params.cid;
    carts.delateProductsInCart(cid)
})
export default router