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
    const productos = await carts.getById(cid);
    res.json({productos:productos})
});

router.put("/:cid/product/:pid/:cuantity",async(req,res)=>{
    const cid = req.params.cid;
    const pid = req.params.pid;
    const cuantity = req.params.pid;
    carts.updateCart(cid,pid,cuantity)
})

export default router