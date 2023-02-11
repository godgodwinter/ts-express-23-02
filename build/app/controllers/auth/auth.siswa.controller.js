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
const sekolah_service_1 = __importDefault(require("../../services/sekolah.service"));
const { siswa, admin } = models_1.default;
class AuthSiswaController {
    constructor() {
        this.siswaLogin = async (req, res) => {
            try {
                const resSiswa = await siswa.scope('withPassword').findOne({
                    where: {
                        username: req.body.email,
                    },
                });
                if (!resSiswa) {
                    return res.status(404).send({ message: "User Not found." });
                }
                // console.log('tes', req.body.password, user.password);
                const passwordIsValid = bcryptjs_1.default.compareSync(req.body.password, resSiswa.password);
                if (!passwordIsValid) {
                    return res.status(401).send({
                        message: "Invalid Password!",
                    });
                }
                const expiredTimer = 86400 * 7; // 24 hours
                const token = jsonwebtoken_1.default.sign({ id: resSiswa.id, nama: resSiswa.nama, role: (0, babengGeneral_1.encode_base64)('siswa') }, auth_config_1.secret, {
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
                    id: resSiswa.id,
                    username: resSiswa.username,
                    nama: resSiswa.nama
                });
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
        this.siswaMe = async (req, res) => {
            try {
                let identitas = await siswa.findOne({
                    where: {
                        id: req.app.locals.siswaId,
                    },
                });
                const expiredTimer = 86400 * 7; // 24 hours
                const newToken = jsonwebtoken_1.default.sign({ id: req.app.locals.siswaId }, auth_config_1.secret, {
                    expiresIn: expiredTimer,
                });
                let sekolah = null;
                let paket = null;
                let stats = null;
                let data = {
                    token: null,
                    newToken
                };
                return res.status(200).send({
                    identitas,
                    sekolah,
                    paket,
                    stats,
                    data
                });
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
        this.siswaMeUjian = async (req, res) => {
            try {
                let me = await siswa.findOne({
                    where: {
                        id: req.app.locals.siswaId,
                    },
                    include: [models_1.default.kelas, models_1.default.sekolah]
                });
                const expiredTimer = 86400 * 7; // 24 hours
                const newToken = jsonwebtoken_1.default.sign({ id: req.app.locals.siswaId }, auth_config_1.secret, {
                    expiresIn: expiredTimer,
                });
                let sekolah = me === null || me === void 0 ? void 0 : me.sekolah;
                let kelas = me === null || me === void 0 ? void 0 : me.kelas;
                let stats = null;
                let data = {
                    token: null,
                    newToken
                };
                let profile = me;
                // delete profile.kelas;
                // delete profile.sekolah;
                // console.log(profile);
                const service = new sekolah_service_1.default(req);
                const paket = await service.getPaket(sekolah === null || sekolah === void 0 ? void 0 : sekolah.paket_id);
                // console.log('====================================');
                // console.log(paket);
                // console.log('====================================');
                let identitas = {
                    sekolah,
                    kelas,
                    profile,
                    paket,
                };
                let kelas_id = me === null || me === void 0 ? void 0 : me.kelas_id;
                let ujian = [];
                return res.status(200).send({
                    identitas,
                    kelas_id,
                    ujian
                });
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
    }
}
exports.default = new AuthSiswaController();
