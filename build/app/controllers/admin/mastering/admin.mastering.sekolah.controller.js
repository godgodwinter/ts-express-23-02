"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sekolah_service_1 = __importDefault(require("../../../services/sekolah.service"));
class AdminMasteringSekolahController {
    constructor() {
        this.getSekolahAll = async (req, res) => {
            try {
                const service = new sekolah_service_1.default(req);
                const datas = await service.getSekolahAll();
                return res.send({
                    data: datas,
                    message: "Success"
                });
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
        this.Edit = async (req, res) => {
            try {
                const service = new sekolah_service_1.default(req);
                const datas = await service.Edit();
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
exports.default = new AdminMasteringSekolahController();
