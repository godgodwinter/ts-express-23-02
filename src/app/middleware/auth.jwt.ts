import { IDecoded, Role } from './../interface/auth.interface';
import { decode_base64 } from './../helpers/babengGeneral';
import jwt from "jsonwebtoken"
import { secret } from "../config/auth.config"
import db from "../models"
const { siswa } = db;
import { Response, Request, NextFunction } from "express";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    let token: string | undefined = req.headers['authorization']
    let bearerToken: any = null;
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
    // console.log(secret);
    // console.log('====================================');
    jwt.verify(bearerToken, secret, (err: any, decoded: IDecoded | any): any => {
        // console.log('====================================');
        // console.log(err);
        // console.log('====================================');
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!",
            });
        }
        // console.log('====================================');
        // console.log(decoded, decode_base64(decoded?.role));
        // console.log('====================================');
        req.app.locals.id = decoded.id;
        req.app.locals.siswaId = decoded.id;
        req.app.locals.meId = decoded.id;
        req.app.locals.role = decode_base64(decoded?.role);
        // console.log(req.app.locals);

        next();
    });
};

export const menuSiswa = (req: Request, res: Response, next: NextFunction) => {
    const yourRole = req.app.locals?.role;
    console.log(yourRole)
    if (yourRole === 'siswa') {
        next();
    } else {
        return res.status(401).send({
            message: "Unauthorized",
        });
    }
}

export const menuAdminOwner = (req: Request, res: Response, next: NextFunction) => {
    const yourRole = req.app.locals?.role;
    console.log(yourRole)
    if (yourRole === 'admin' || yourRole === 'owner') {
        next();
    } else {
        return res.status(401).send({
            message: "Unauthorized",
        });
    }
}


export const menuSekolah = (req: Request, res: Response, next: NextFunction) => {
    const yourRole = req.app.locals?.role;
    console.log(yourRole)
    if (yourRole === 'sekolah') {
        next();
    } else {
        return res.status(401).send({
            message: "Unauthorized",
        });
    }
}


const authJwt = {
    verifyToken,
    menuAdminOwner,
    menuSiswa,
    menuSekolah
}
export default authJwt