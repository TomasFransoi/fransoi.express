import fs from "fs"
import cartModel from "./models/cartsModel"
import productModel from "./models/productsModel"
class Contenedor {
    createCart = async(products = [])=>{
        try{
                    const newCart={
                        products
                    }
                    await cartModel.create(newCart)
                    carts.push(newCart)
                    await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2))
                    return "carrito creado"
        }catch (error){
            console.log(error)
        }
    }
    getById = async(cid)=>{
        try {
                    const cart = cartModel.findOne({_id:cid})

                    return  cart.products
        } catch (error) {
            console.log(error)
        }
    }
    updateCart = async(cid,pid,cuantity = 1)=>{
        try {
            const cart = await cartModel.findOne({_id:cid})
            const product = await productModel.findOne({_id:pid})
            if (cart != undefined && product != undefined) {
                const productRepetido = cart.products.find(producto => producto._id == pid)                      
            if (productRepetido != undefined){
                const productNew = {
                    _id:product.pid,
                    cuantity,
                };

                cart.products.push(productNew);
                await cartModel.findOneAndUpdate(cid,cart)
            }else{
                return "ya hay un producto con el mismo id"
            }                        
            } else {
                console.log("No se encontro el producto con el id especificado o carito con el id especificado");
                }
        }catch (error) {
            console.log(error);
        }

    }
    delateProduct = async(cid,pid)=>{
        const cart = await cartModel.findOne({_id:cid})
        const productosNuevos = cart.products.filter(obj => obj._id !== pid)
        cart.products = [...productosNuevos]
        await cartModel.findOneAndUpdate(cid,cart)
    }
    updateCuantity = async(cuantity,pid,cid)=>{
        const cart = await cartModel.findOne({_id:cid})
        const product = await productModel.findOne({_id:pid})
        const productosNuevos = cart.products.filter(obj => obj._id !== pid)
        const productNew = {
            _id:product.pid,
            cuantity,
        };
        productosNuevos.push(productNew)
        cart.products = [...productosNuevos]
        await cartModel.findOneAndUpdate(cid,cart)
    }
    delateProductsInCart = async(cid)=>{
        const cart = await cartModel.findOne({_id:cid})
        cart.products = []
        await cartModel.findOneAndUpdate(cid,cart)

    }
}
const carts = new Contenedor("../public/carts.json","../public/productos.json")

export default Contenedor;