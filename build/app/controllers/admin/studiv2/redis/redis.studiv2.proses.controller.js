"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_studiv2_proses_service_1 = __importDefault(require("../../../../services/studiv2/redis/redis.studiv2.proses.service"));
class redisStudiv2ProsesController {
    constructor() {
        this.proses_siswa_get = async (req, res) => {
            try {
                const service = new redis_studiv2_proses_service_1.default(req);
                const datas = await service.proses_siswa_get(parseInt(req.params.siswa_id));
                return res.send({
                    data: datas,
                    message: "Success"
                });
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
        this.proses_siswa_store = async (req, res) => {
            try {
                const service = new redis_studiv2_proses_service_1.default(req);
                const datas = await service.proses_siswa_store(parseInt(req.params.siswa_id));
                return res.send({
                    data: datas,
                    message: "Success"
                });
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
        this.proses_siswa_delete = async (req, res) => {
            try {
                const service = new redis_studiv2_proses_service_1.default(req);
                const datas = await service.proses_siswa_delete(parseInt(req.params.siswa_id));
                return res.send({
                    data: datas,
                    message: "Success"
                });
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
        this.proses_kelas_store = async (req, res) => {
            try {
                const service = new redis_studiv2_proses_service_1.default(req);
                const datas = await service.proses_kelas_store(parseInt(req.params.kelas_id));
                return res.send({
                    data: datas,
                    message: "Success"
                });
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
        this.proses_kelas_delete = async (req, res) => {
            try {
                const service = new redis_studiv2_proses_service_1.default(req);
                const datas = await service.proses_kelas_delete(parseInt(req.params.kelas_id));
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
exports.default = new redisStudiv2ProsesController();
