"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importDefault(require("../../models"));
const { siswa, kelas, sekolah, paket, ortu } = models_1.default;
class siswaService {
    constructor(req) {
        this.siswaGetWhereId = async (id) => {
            var _a, _b;
            try {
                const response = await siswa.findOne({
                    where: { id, deleted_at: null },
                    include: [{ model: sekolah }, { model: kelas }]
                });
                response.setDataValue("sekolah_nama", (_a = response === null || response === void 0 ? void 0 : response.sekolah) === null || _a === void 0 ? void 0 : _a.nama);
                response.setDataValue("kelas_nama", (_b = response === null || response === void 0 ? void 0 : response.kelas) === null || _b === void 0 ? void 0 : _b.nama);
                return response;
            }
            catch (error) {
                console.log(error.message);
            }
        };
        this.siswaGetWhereKelas = async (kelas_id) => {
            var _a;
            try {
                const response = await siswa.findAll({
                    where: { kelas_id, deleted_at: null },
                    include: [models_1.default.kelas]
                });
                for (const [index, item] of response.entries()) {
                    let getDataOrtu = await ortu.findOne({ where: { siswa_id: item.id } });
                    response[index].setDataValue("kelas_nama", (_a = response[index].kelas) === null || _a === void 0 ? void 0 : _a.nama);
                    response[index].setDataValue("ortu_username", getDataOrtu.username);
                    response[index].setDataValue("ortu_passworddefault", getDataOrtu.passworddefault);
                }
                return response;
            }
            catch (error) {
                console.log(error.message);
            }
        };
        this.siswaGetWhereKelasNoPass = async (kelas_id) => {
            var _a;
            try {
                const response = await siswa.scope('withoutPass').findAll({
                    where: { kelas_id, deleted_at: null },
                    include: [models_1.default.kelas]
                });
                for (const [index, item] of response.entries()) {
                    let getDataOrtu = await ortu.findOne({ where: { siswa_id: item.id } });
                    response[index].setDataValue("kelas_nama", (_a = response[index].kelas) === null || _a === void 0 ? void 0 : _a.nama);
                }
                return response;
            }
            catch (error) {
                console.log(error.message);
            }
        };
        this.body = req.body;
        this.params = req.params;
    }
}
exports.default = siswaService;
