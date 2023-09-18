import initApiRoutes from "./routers/router.js";
import config from "./utils/config.js";
import express from "express";

const app = express();
app.use(express.json());
app.use("/api", initApiRoutes());

app.listen(config.server, ()=>{
    console.log(`El servidor está activo: http://${config.server.hostname}:${config.server.port}`);
})
