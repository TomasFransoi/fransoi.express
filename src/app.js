import app from "./index";
import {port} from "./config/config";
app.listen(port,()=>{
    console.log(`servidor activado en puerto ${port}`)
});
