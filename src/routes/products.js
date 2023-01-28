import { Router } from "express";
const router = Router();
import Contenedor from "../../public/manejoDeProductos.js";
const productos = new Contenedor("../data/productos.json")

router.get("/",async(req,res) =>{
    const {limit} = req.query;
    const products = await productos.getAll();
    if (limit){
        products.splice(limit);
        res.json({products:products})
    }else{
        res.json({products:products})
    }
});
router.get("/:pid",async(req,res) =>{
    const pid = req.params.pid;
    const producto = await productos.getById(pid);
    res.json({producto:producto})
});
router.post("/",async(req,res) =>{
    const {title,code,description,price,thumbnail,stock} = req.body
    const respuesta = await productos.addProduct(title,code,description,price,thumbnail,stock)
    res.json({message: respuesta})
})
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
router.delete("/:pid",async(req,res)=>{
    const pid = req.params.pid
    productos.deleteById(pid)
})
export default router