import { Router } from "express";
const router = Router();
import Contenedor from "../dao/manejoDeProductos.js";
import {io} from "../index"
const productos = new Contenedor("../data/productos.json")
router.get("/",async(req,res) =>{
    const {query,limit,page,sort} = req.query;
    const products = await productos.getAll(query,limit,page,sort);
    const result = await Swal.fire({
        title: "Identificate",
        input: "text",
        text: "Ingresa un ID",
        inputValidator: value => {
          return !value && "Necesitas escribir un ID para continuar!"
        },
        allowOutsideClick: false
      })
      const ID = result.value
      localStorage.setItem("id",ID)
        res.render("products",{products:products,id:ID})
        res.json({products:products})
});
router.get("/:pid",async(req,res) =>{
    const pid = req.params.pid;
    const ID = localStorage.getItem("id")
    const producto = await productos.getById(pid);
    res.render("producto",{producto:producto,id:ID})
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