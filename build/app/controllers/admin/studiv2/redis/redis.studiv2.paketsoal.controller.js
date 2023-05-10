"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_studiv2_paketsoal_service_1 = __importDefault(require("../../../../services/studiv2/redis/redis.studiv2.paketsoal.service"));
class redisStudiv2PaketsoalController {
    constructor() {
        this.index = async (req, res) => {
            try {
                const service = new redis_studiv2_paketsoal_service_1.default(req);
                const datas = await service.testing();
                // setTimeout(()=>{},5000)
                // ! DONT DELETE : EXAMPLE DELAY TESTING
                // const fn_delay_response = (arg:any)=>{
                //     console.log(`arg was => ${arg}`);
                //     // return res.status(500).send({ message: "error.message" });
                //     return res.send({
                //         data: datas,
                //         message: "Success"
                //     });
                //   }
                //   setTimeout(fn_delay_response, 3000, 'argumen example');
                // ! DONT DELETE : EXAMPLE DELAY TESTING
                return res.send({
                    data: datas,
                    message: "Success"
                });
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
        this.paketsoal_aktif_get = async (req, res) => {
            try {
                const service = new redis_studiv2_paketsoal_service_1.default(req);
                const datas = await service.paketsoal_aktif_get();
                return res.send({
                    data: datas,
                    message: "Success"
                });
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
        this.paketsoal_aktif_get_less = async (req, res) => {
            try {
                const service = new redis_studiv2_paketsoal_service_1.default(req);
                const datas = await service.paketsoal_aktif_get_less();
                return res.send({
                    data: datas,
                    message: "Success"
                });
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
        this.paketsoal_aktif_delete = async (req, res) => {
            try {
                const service = new redis_studiv2_paketsoal_service_1.default(req);
                const datas = await service.paketsoal_aktif_delete();
                return res.send({
                    data: datas,
                    message: "Success"
                });
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
        this.paketsoal_aktifkan = async (req, res) => {
            try {
                const service = new redis_studiv2_paketsoal_service_1.default(req);
                const datas = await service.paketsoal_aktifkan(parseInt(req.params.paketsoal_id));
                return res.send({
                    data: datas,
                    message: "Success"
                });
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
        this.paketsoal_store = async (req, res) => {
            try {
                const service = new redis_studiv2_paketsoal_service_1.default(req);
                const datas = await service.paketsoal_store(parseInt(req.params.paketsoal_id));
                return res.send({
                    data: datas,
                    message: "Success"
                });
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
        this.aspek_detail_store = async (req, res) => {
            try {
                const service = new redis_studiv2_paketsoal_service_1.default(req);
                const datas = await service.aspek_detail_store(parseInt(req.params.aspek_detail_id));
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
exports.default = new redisStudiv2PaketsoalController();
