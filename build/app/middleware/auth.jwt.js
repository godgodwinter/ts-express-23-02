"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_config_1 = require("../config/auth.config");
const models_1 = __importDefault(require("../models"));
const { siswa } = models_1.default;
const verifyToken = (req, res, next) => {
    let token = req.headers['authorization'];
    let bearerToken = null;
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
    jsonwebtoken_1.default.verify(bearerToken, auth_config_1.secret, (err, decoded) => {
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
        req.app.locals.siswaId = decoded.id;
        req.app.locals.meId = decoded.id;
        // console.log(req.app.locals);
        next();
    });
};
const authJwt = {
    verifyToken
};
exports.default = authJwt;
