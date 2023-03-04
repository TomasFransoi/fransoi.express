import {app} from "./index.js";
import {port} from "./config/config.js";
app.listen(port,()=>{
    console.log(`servidor activado en puerto ${port}`)
});
