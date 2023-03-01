"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importDefault(require("../../models"));
const { siswa, kelas, sekolah, paket } = models_1.default;
class kelasService {
    constructor(req) {
        this.kelasGetWhereSekolah = async (sekolah_id) => {
            try {
                const response = await kelas.findAll({
                    where: { sekolah_id, deleted_at: null }
                });
                return response;
            }
            catch (error) {
                console.log(error.message);
            }
        };
        this.kelasGetWhereId = async (kelas_id) => {
            try {
                const response = await kelas.findOne({
                    where: { id: kelas_id, deleted_at: null }
                });
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
exports.default = kelasService;
