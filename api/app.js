import initApiRoutes from "./routers/router.js";
import { appLogin} from "./routers/loginRouter.js";
import { appSingUP, router } from "./routers/noTokenRoutes.js";
import config from "./utils/config.js";
import express from "express";
import { loginDTO, registerDTO } from "./middleware/dtoLogin.js";
import { ValidateSession, ValidateSingUp } from "./middleware/verifyData.js";
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());
   
app.use("/api", initApiRoutes());
app.use("/login", loginDTO, ValidateSession, appLogin);
app.use("/singUp", registerDTO, ValidateSingUp , appSingUP);
app.use("/", router)
const configuration = {
    port: config.portBack,
    host: config.host
}
app.listen(configuration, ()=>{
    console.log(`El servidor está activo: http://${config.host}:${config.portBack}`);
});