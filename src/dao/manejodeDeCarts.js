import fs from "fs"
import cartModel from "./models/cartsModel"
import productModel from "./models/productsModel"
class Contenedor {
    constructor(path,productsPath){
        this.path = path;
        this.productsPath = productsPath;
    }
    createCart = async(products = [])=>{
        try{
            if (fs.existsSync(this.path)) {
                const contenido = await fs.promises.readFile(this.path,"utf8")
                if (contenido) {
                    const carts = JSON.parse(contenido)
                    const cartId = carts.length+1
                    const newCart={
                        cid:cartId,
                        products
                    }
                    await cartModel.create(newCart)
                    carts.push(newCart)
                    await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2))
                    return "carrito creado"
                } else {
                    const newCart={
                        cid:1,
                        products
                    }
                    await cartModel.create(newCart)
                    await fs.promises.writeFile(this.path,JSON.stringify([newCart],null,2))
                    return "carrito creado"
                }
            } else {
                const newCart={
                    cid:1,
                    products
                }
                await cartModel.create(newCart)
                await fs.promises.writeFile(this.path,JSON.stringify([newCart],null,2))
                return "carrito creado"
            }
        }catch (error){
            console.log(error)
        }
    }
    getById = async(cid)=>{
        try {
            if(fs.existsSync(this.path)){
                const contenido = await fs.promises.readFile(this.path,"utf8");
                if(contenido){
                    const carts = JSON.parse(contenido);
                    const cart = cartModel.findOne(cid)
                    //const cart = carts.find(item=>item.id===id);

                    return  cart.products
                } else{
                    return  "El archivo esta vacio"
                }
            }else{
                return  "El archivo no existe"
            }
        } catch (error) {
            console.log(error)
        }
    }
    updateCart = async(cid,pid,cuantity = 1)=>{
        try {
            const cart = await cartModel.findOne(cid)
            const product = await productModel.findOne(pid)
            if (cart != undefined && product != undefined) {
                const productRepetido = cart.products.find(producto => producto.pid == pid)                      
            if (productRepetido != undefined){
                const productNew = {
                    productPid :product.pid,
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
                            /*
            if (fs.existsSync(this.path) && fs.existsSync(this.productsPath)) {


                const contenidoCarts = await fs.promises.readFile(this.path,"utf8");
                const contenidoProducts = await fs.promises.readFile(this.productsPath,"utf8");
                    if (contenidoCarts && contenidoProducts) {
                        const carts = JSON.parse(contenidoCarts);
                        const productos = JSON.parse(contenidoProducts);
                        const cart = carts.find(cart => cart.id == cid);
                        const product = productos.find(producto => producto.id == pid);
                        if (cart != undefined && product != undefined) {
                            const productRepetido = cart.products.find(producto => producto.id == pid)                      
                        if (productRepetido != undefined){
                            const cardIndex = productos.findIndex(card => card.id == cip);
                            const product = {
                                productId :product.id,
                                cuantity,
                            };

                            cart.products.push(product);
                            console.log(cart);
                            carts[cardIndex] = cart
                            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
                        }else{
                            return "ya hay un producto con el mismo id"
                        }
                        } else {
                        console.log("No se encontro el producto con el id especificado o carito con el id especificado");
                        }
                } else {
                    return "El archivo de carts o products esta vacio"
                }

            } else {
                                console.log("a")
                return "El archivo de carts o productos no existe"

            }
            */
        }catch (error) {
            console.log(error);
        }

    }
}
const carts = new Contenedor("../public/carts.json","../public/productos.json")

export default Contenedor;