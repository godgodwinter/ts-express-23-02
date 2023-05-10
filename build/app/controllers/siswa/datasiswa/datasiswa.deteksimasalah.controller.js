"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const siswa_datasiswa_service_1 = __importDefault(require("../../../services/siswa/siswa.datasiswa.service"));
class DataSiswaDeteksimasalahController {
    constructor() {
        this.getPersiswa = async (req, res) => {
            try {
                const service = new siswa_datasiswa_service_1.default(req);
                const datas = await service.get_deteksimasalah_persiswa(parseInt(req.params.siswa_id));
                return res.send({
                    data: datas,
                    message: "Success"
                });
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
        this.getPerkelas = async (req, res) => {
            try {
                const service = new siswa_datasiswa_service_1.default(req);
                const datas = await service.get_deteksimasalah_perkelas(parseInt(req.params.kelas_id));
                return res.send({
                    data: datas,
                    message: "Success"
                });
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
    }
}
exports.default = new DataSiswaDeteksimasalahController();
