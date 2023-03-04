import express from "express";
import router from "./router/index.js"
import handlebars from "express-handlebars"
import { Server } from "socket.io";
import http from "http"
import mongoose from "mongoose";
import {userDb,passDb} from "./config/config";

const app = express();


app.use(express.json());
app.use(express.static(__dirname + "/public"))
app.use(express.urlencoded({extended:true}));
app.engine("handlebars",handlebars.engine())
app .set("views", "./views")
app.set("view engine","handlebars")
const server = http.createServer(app)
router(app);
mongoose.connect(`mongodb+srv://${userDb}:${passDb}@tomasfransoi.vpqjpof.mongodb.net/?retryWrites=true&w=majority`,(error)=>{
if (error) {
    console.log(`cannot connect to database: ${error}`);
    parseWithoutProcessing.exit()
}
})
const io = new Server(server);
export default {app,io}
