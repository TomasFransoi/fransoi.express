import fs from "fs"
import products from "./models/productsModel"
class Contenedor {
    constructor(path){
        this.path = path;
    }
    addProduct = async(title,code,description,price,thumbnail,stock,status = "true",category)=>{
        try{
            if (title === undefined && description === undefined && price === undefined && stock === undefined && code === undefined && category === undefined) {
            if (fs.existsSync(this.path)) {
                const contenido = await fs.promises.readFile(this.path,"utf8")
                if (contenido) {
                    const productos = JSON.parse(contenido)
                    if (productos.find(element => element.code == code) !== undefined) {
                        const newProductId = productos.length+1
                        const newProducto={
                            pid:newProductId,
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
                        productos.push(newProducto)
                        await fs.promises.writeFile(this.path, JSON.stringify(productos, null, 2))
                        return "producto agregado"
                    }else {
                            console.log("ya hay un objeto con ese code");
                        }   
                } else {
                    const newProducto={
                        pid:1,
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
                    await fs.promises.writeFile(this.path,JSON.stringify([newProducto],null,2))
                    return "producto agregado"
                }
            } else {
                const newProducto={
                    pid:1,
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
                await fs.promises.writeFile(this.path,JSON.stringify([newProducto],null,2))
                return "producto agregado"
            }}else{
                return "rellenar todos los criterios";
            }
        }catch (error){
            console.log(error)
        }
    }
    getById = async(pid)=>{
        try {
            if(fs.existsSync(this.path)){
                const contenido = await fs.promises.readFile(this.path,"utf8");
                if(contenido){
                    const producto = await products.findOne(pid)
                    return producto
                } else{
                    return "El archivo esta vacio"
                }
            }else{
                return "El archivo no existe"
            }
        } catch (error) {
            console.log(error)
        }
    }
    getAll = async()=>{
        try {
            if (fs.existsSync(this.path)) {
                const contenido = await fs.promises.readFile(this.path,"utf8");
                if (contenido) {
                    const productos = await products.find()
                    return productos
                } else {
                    return "El archivo esta vacio"
                }

            } else {
                return "El archivo no existe"
            }

        } catch (error) {
            console.log(error)
        }
    }
    deleteById = async(pid)=>{
        try {
            if (fs.existsSync(this.path)) {
                const contenido = await fs.promises.readFile(this.path,"utf8");
                    if (contenido) {
                        products.findOneAndDelete(pid)
                        const productos = JSON.parse(contenido);
                        const newProductos = productos.filter(producto=>producto.id!==_id);
                        await fs.promises.writeFile(this.path, JSON.stringify(newProductos, null, 2));
                } else {
                    return "El archivo esta vacio"
                }

            } else {
                return "El archivo no existe"
            }
        } catch (error) {
            console.log(error)
        }
    }
    deleteAll = async()=>{
        try {
            if (fs.existsSync(this.path)) {
                const contenido = await fs.promises.readFile(this.path,"utf8");
                    if (contenido) {
                        products.deleteMany()
                        await fs.promises.writeFile(this.path, JSON.stringify([]));
                        await products.deleteMany()
                } else {
                    return "El archivo esta vacio"
                }

            } else {
                return "El archivo no existe"
            }
        } catch (error) {
            console.log(error)
        }
    }
    updateProduct = async(pid,updates)=>{
        try {
            if (fs.existsSync(this.path)) {
                const contenido = await fs.promises.readFile(this.path,"utf8");
                    if (contenido) {
                        products.findOneAndUpdate(pid,updates)
                        const productos = JSON.parse(contenido);
                        const productIndex = productos.findIndex(producto => producto.id == _id);
                        if (productIndex > -1) {
                        const updatedProduct = {
                            ...productos[productIndex],
                            ...updates,
                        };
                        productos[productIndex] = updatedProduct;
                        await fs.promises.writeFile(this.path, JSON.stringify(productos, null, 2));
                        } else {
                        console.log("No se encontro el producto con el id especificado");
                        }
                } else {
                    return "El archivo esta vacio"
                }

            } else {
                return "El archivo no existe"
            }

        } catch (error) {
            
        }

    }
}
export default Contenedor;