import express from "express";
import Contenedor from "./TomasFransoi_ManejoDeArchivos.js";
const productos = new Contenedor("public/productos.json")
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}));


app.get("/products",async(req,res) =>{
    const limit = req.query;
    const products = await productos.getAll();
    if (limit != undefined){
        products.splice(limit);
        res.json({products:products})
    }else{
        res.json({products:products})
    }
});
app.get("/products/:id",async(req,res) =>{
    const id = req.params();
    const producto = await productos.getById(id);
    res.json({producto:producto})
});
app.listen(8080,()=>{
    console.log("servidor activado en puerto 8080")
});