import express from "express";
import router from "./router/index.js"
import handlebars from "express-handlebars"
import { Server } from "socket.io";
import http from "http"

const app = express();


app.use(express.json());
app.use(express.static(__dirname + "/public"))
app.use(express.urlencoded({extended:true}));
app.engine("handlebars",handlebars.engine())
app .set("views", "./views")
app.set("view engine","handlebars")
const server = http.createServer(app)
const io = new Server(server);
router(app);

export default app;io