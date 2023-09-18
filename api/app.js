import initApiRoutes from "./routers/router.js";
import { appLogin } from "./routers/loginRouter.js";
import config from "./utils/config.js";
import express from "express";
import { loginDTO } from "./middleware/dtoLogin.js";
import { ValidateSession } from "./middleware/verifyData.js";

const app = express();
app.use(express.json());

app.use("/api", initApiRoutes());
app.use("/login", loginDTO, ValidateSession, appLogin);
app.listen(config.server, ()=>{
    console.log(`El servidor está activo: http://${config.server.hostname}:${config.server.port}`);
})
