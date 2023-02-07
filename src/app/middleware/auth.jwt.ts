import jwt from "jsonwebtoken"
import { secret } from "../config/auth.config"
import db from "../models"
const {siswa} = db;
import { Response,Request,NextFunction } from "express";

const verifyToken= (req:Request,res:Response,next:NextFunction)=>{
    let token :string|undefined =req.headers['authorization']
    let bearerToken:any = null;
    // console.log(token);
    if (!token) {
        return res.status(403).send({
            message: "No token provided!",
        });
    }
    if (typeof token !== 'undefined') {
        const bearer = token.split(" ");
        bearerToken = bearer[1];
    }
    // console.log('====================================');
    // console.log(config.secret);
    // console.log('====================================');
    jwt.verify(bearerToken, secret, (err:any, decoded:any) => {
        // console.log('====================================');
        // console.log(err);
        // console.log('====================================');
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!",
            });
        }
        // console.log('====================================');
        // console.log(decoded);
        // console.log('====================================');
        req.app.locals.credential.siswaId = decoded.id;
        req.app.locals.credential.meId = decoded.id;
        next();
    });
};

const authJwt ={
    verifyToken
}
export default authJwt