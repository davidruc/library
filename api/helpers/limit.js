import rateLimit from "express-rate-limit";

export let limitPetitions = ()=>{
    return rateLimit({
        windowMs: 30*1000, //Se reinicia cada 30 segundos
        max: 5,
        standardHeaders: false,
        legacyHeaders: false,
        skip: (req, res)=>{
            if(req.headers["content-length"]>500){
                res.status(413).send({
                    status: 413,
                    message: "The content is to large"
                });
                return true;
            }
        },
        message: (req, res)=>{
            res.status(429).send({
                status: 429,
                message: "The limit of querys was exceeded"
            })
        }
    })
}