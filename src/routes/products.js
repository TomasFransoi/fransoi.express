import { Router } from "express";
const router = Router();
import Contenedor from "../dao/manejoDeProductos.js";
import {io} from "../index"
const productos = new Contenedor("../data/productos.json")

router.get("/",async(req,res) =>{
    const {limit} = req.query;
    const products = await productos.getAll();
    if (limit){
        products.splice(limit);
        res.render("home",{products:products})
        res.json({products:products})
    }else{
        res.render("home",{products:products})
        res.json({products:products})
    }
});
router.get("/:pid",async(req,res) =>{
    const pid = req.params.pid;
    const producto = await productos.getById(pid);
    res.json({producto:producto})
});
router.put("/:pid",async(req,res)=>{
    const pid = req.params.pid
    const {title,code,description,price,thumbnail,stock} = req.body
    const updates = {
        title,
        code,
        description,
        price,
        thumbnail,
        stock
    }
    productos.updateProduct(pid,updates)
})
router.get("/realTimeProducts",(req,res)=>{
    res.render("realTimeProducts",{})
})
io.on("connect", async(socket)=>{
    const products = await productos.getAll()
    socket.emit("products",products)
    router.post("/",async(req,res) =>{
        const {title,code,description,price,thumbnail,stock} = req.body
        const respuesta = await productos.addProduct(title,code,description,price,thumbnail,stock)
        res.json({message: respuesta})
        const products = await productos.getAll()
        socket.emit("products",products)
    })
    router.delete("/:pid",async(req,res)=>{
        const pid = req.params.pid
        productos.deleteById(pid)
        const products = await productos.getAll()
        socket.emit("products",products)
    })
})
export default router