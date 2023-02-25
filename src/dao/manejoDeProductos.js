import fs from "fs"
import products from "./models/productsModel"
class Contenedor {
    constructor(path){
        this.path = path;
    }
    addProduct = async(title,code,description,price,thumbnail,stock,status = "true",category)=>{
        try{
            if (title === undefined && description === undefined && price === undefined && stock === undefined && code === undefined && category === undefined) {
                    if (productos.find(element => element.code == code) !== undefined) {
                        const newProducto={
                            title,
                            code,
                            description,
                            price,
                            thumbnail,
                            stock,
                            status,
                            category
                        }
                        await products.create(newProducto)
                        return "producto agregado"
                    }else {
                            console.log("ya hay un objeto con ese code");
                        }   
                    }else{
                return "rellenar todos los criterios";
            }
        }catch (error){
            console.log(error)
        }
    }
    getById = async(pid)=>{
        try {
                    const producto = await products.findOne({_id:pid})
                    return producto
        } catch (error) {
            console.log(error)
        }
    }
    getAll = async(query = {},limit,page,sort)=>{
        try {
            const sortLowCase = sort.toLowerCase()
                    const productos = await products.paginate(query,{limit:limit,page:page,sort:{price :sortLowCase}})
                    return productos
        } catch (error) {
            console.log(error)
        }
    }
    deleteById = async(pid)=>{
        try {
                        products.findOneAndDelete({_id:pid})
        } catch (error) {
            console.log(error)
        }
    }
    deleteAll = async()=>{
        try {
                        await products.deleteMany()
        } catch (error) {
            console.log(error)
        }
    }
    updateProduct = async(pid,updates)=>{
        try {
                        products.findOneAndUpdate(pid,updates)
        } catch (error) {
            
        }

    }
}
export default Contenedor;