"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuSekolah = exports.menuAdminOwner = exports.menuSiswa = exports.verifyToken = void 0;
const babengGeneral_1 = require("./../helpers/babengGeneral");
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
        // console.log(decoded, decode_base64(decoded?.role));
        // console.log('====================================');
        req.app.locals.tokenOld = bearerToken;
        req.app.locals.siswaId = decoded.id;
        req.app.locals.id = decoded.id;
        req.app.locals.nama = decoded.nama;
        req.app.locals.meId = decoded.id;
        req.app.locals.role = decoded.hasOwnProperty("role") ? (0, babengGeneral_1.decode_base64)(decoded.role) : null;
        // console.log(req.app.locals);
        next();
    });
};
exports.verifyToken = verifyToken;
const menuSiswa = (req, res, next) => {
    var _a;
    const yourRole = (_a = req.app.locals) === null || _a === void 0 ? void 0 : _a.role;
    console.log(yourRole);
    if (yourRole === 'siswa') {
        next();
    }
    else {
        return res.status(401).send({
            message: "Unauthorized",
        });
    }
};
exports.menuSiswa = menuSiswa;
const menuAdminOwner = (req, res, next) => {
    var _a;
    const yourRole = (_a = req.app.locals) === null || _a === void 0 ? void 0 : _a.role;
    console.log(yourRole);
    if (yourRole === 'admin' || yourRole === 'owner') {
        next();
    }
    else {
        return res.status(401).send({
            message: "Unauthorized",
        });
    }
};
exports.menuAdminOwner = menuAdminOwner;
const menuSekolah = (req, res, next) => {
    var _a;
    const yourRole = (_a = req.app.locals) === null || _a === void 0 ? void 0 : _a.role;
    console.log(yourRole);
    if (yourRole === 'sekolah') {
        next();
    }
    else {
        return res.status(401).send({
            message: "Unauthorized",
        });
    }
};
exports.menuSekolah = menuSekolah;
const authJwt = {
    verifyToken: exports.verifyToken,
    menuAdminOwner: exports.menuAdminOwner,
    menuSiswa: exports.menuSiswa,
    menuSekolah: exports.menuSekolah
};
exports.default = authJwt;
