"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const babengGeneral_1 = require("../../helpers/babengGeneral");
const auth_config_1 = require("../../config/auth.config");
const models_1 = __importDefault(require("../../models"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const { owner } = models_1.default;
class AuthOwnerController {
    constructor() {
        this.ownerLogin = async (req, res) => {
            try {
                const response = await owner.scope('withPassword').findOne({
                    where: {
                        username: req.body.email,
                    },
                });
                if (!response) {
                    return res.status(404).send({ message: "User Not found." });
                }
                // console.log('tes', req.body.password, user.password);
                const passwordIsValid = bcryptjs_1.default.compareSync(req.body.password, response.password);
                if (!passwordIsValid) {
                    return res.status(401).send({
                        message: "Invalid Password!",
                    });
                }
                const expiredTimer = 86400 * 7; // 24 hours
                const token = jsonwebtoken_1.default.sign({ id: response.id, nama: response.nama, role: (0, babengGeneral_1.encode_base64)('owner') }, auth_config_1.secret, {
                    expiresIn: expiredTimer,
                });
                // req.token = token;
                req.app.locals.token = token;
                // console.log('====================================');
                // console.log(token, req.app.locals.token);
                // console.log('====================================');
                return res.status(200).send({
                    token,
                    code: 200,
                    token_type: "bearer",
                    expires_in: expiredTimer,
                    id: response.id,
                    username: response.username,
                    nama: response.nama
                });
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
        this.Me = async (req, res) => {
            try {
                let identitas = await owner.findOne({
                    where: {
                        id: req.app.locals.id,
                    },
                });
                const expiredTimer = 86400 * 7; // 24 hours
                const newToken = jsonwebtoken_1.default.sign({ id: req.app.locals.id, nama: req.app.locals.nama, role: (0, babengGeneral_1.encode_base64)('owner') }, auth_config_1.secret, {
                    expiresIn: expiredTimer,
                });
                let sekolah = null;
                let paket = null;
                let stats = null;
                let data = {
                    token: req.app.locals.tokenOld,
                    newToken
                };
                return res.status(200).send({
                    identitas,
                    stats,
                    data
                });
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
    }
}
exports.default = new AuthOwnerController();
