import fs from "fs"
class Contenedor {
    constructor(path){
        this.path = path;
    }
    addProduct = async(title,code,description,price,thumbnail,stock,status = "true",category)=>{
        try{
            if (title != undefined && description != undefined && price != undefined && stock != undefined && code != undefined && category != undefined) {
            if (fs.existsSync(this.path)) {
                const contenido = await fs.promises.readFile(this.path,"utf8")
                if (contenido) {
                    const productos = JSON.parse(contenido)

                    if (productos.find(element => element.code == code) == undefined) {
                    const newProductId = productos.length+1
                    const newProducto={
                        id:newProductId,
                        title,
                        code,
                        description,
                        price,
                        thumbnail,
                        stock,
                        status,
                        category
                    }
                    productos.push(newProducto)
                    await fs.promises.writeFile(this.path, JSON.stringify(productos, null, 2))
                    return "producto agregado"
                }else {
                    return "ya hay un objeto con ese code";
                }   
                } else {
                    const newProducto={
                        id:1,
                        title,
                        code,
                        description,
                        price,
                        thumbnail,
                        stock,
                        status,
                        category
                    }
                    await fs.promises.writeFile(this.path,JSON.stringify([newProducto],null,2))
                    return "producto agregado"
                }
            } else {
                const newProducto={
                    id:1,
                    title,
                    code,
                    description,
                    price,
                    thumbnail,
                    stock,
                    status,
                    category
                }
                await fs.promises.writeFile(this.path,JSON.stringify([newProducto],null,2))
                return "producto agregado"
            }
            } else {
            
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
                    const productos = JSON.parse(contenido);
                    const producto = productos.find(item=>item.id==pid);
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
                    const productos = JSON.parse(contenido);
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
    deleteById = async(id)=>{
        try {
            if (fs.existsSync(this.path)) {
                const contenido = await fs.promises.readFile(this.path,"utf8");
                    if (contenido) {
                        const productos = JSON.parse(contenido);
                        const newProductos = productos.filter(producto=>producto.id!==id);
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
                        await fs.promises.writeFile(this.path, JSON.stringify([]));
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
    updateProduct = async(id,updates)=>{
        try {
            if (fs.existsSync(this.path)) {
                const contenido = await fs.promises.readFile(this.path,"utf8");
                    if (contenido) {
                        const productos = JSON.parse(contenido);
                        const productIndex = productos.findIndex(producto => producto.id == id);
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