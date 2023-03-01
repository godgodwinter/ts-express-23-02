"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importDefault(require("../../models"));
const { siswa, kelas, sekolah, paket } = models_1.default;
class sekolahService {
    constructor(req) {
        this.sekolahGetAll = async () => {
            try {
                const response = await sekolah.findAll({
                    where: { deleted_at: null }
                });
                return response;
            }
            catch (error) {
                console.log(error.message);
            }
        };
        this.sekolahGetWhereId = async (sekolah_id) => {
            try {
                const response = await sekolah.findOne({
                    where: { id: sekolah_id, deleted_at: null }
                });
                const getKelas = await kelas.findAll({ where: { sekolah_id, deleted_at: null } });
                response.setDataValue("kelas", getKelas);
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
exports.default = sekolahService;
