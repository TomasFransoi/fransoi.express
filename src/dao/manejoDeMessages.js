import messagesModel from "./models/messagesModel"
class Contenedor{
    push = async(mensage,usuario)=>{
        const datos = {
            "user":usuario,
            "message":mensage
        }
        await messagesModel.create(datos)
    }
    get = async()=>{
        const log = messagesModel.find()
        return log
    }
}
export default Contenedor;