import {loadEnv} from "vite";

const env = loadEnv("development", process.cwd(), 'VITE')

const config = { 
    "host": env.VITE_HOSTNAME,
    "portBack": env.VITE_PORT_BACKEND,
    "user": env.VITE_ATLAS_USER,
    "pass": env.VITE_ATLAS_PASSWORD,
    "db": env.VITE_ATLAS_DB,
    "key": env.VITE_JWT_PRIVATE_KEY
}

export default config;