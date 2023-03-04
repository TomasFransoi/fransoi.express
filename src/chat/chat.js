import io from "../index.js"
import Contenedor from "../dao/manejoDeMessages.js"
const chat = new Contenedor()
io.on('connection', socket => {
    console.log(`Client with id ${socket.id} is connected`)
  
    socket.on('newUser', user => {
      socket.broadcast.emit('userConnected', user)
        const messages = chat.get()
      socket.emit("messageLogs", messages)
    })
  
    socket.on('message', data => {
      chat.push(data)
      const messages = chat.get()
      io.emit("messageLogs", messages)
    })
  })
export default io
  
  