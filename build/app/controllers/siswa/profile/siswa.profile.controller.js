"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const siswa_profile_service_1 = __importDefault(require("../../../services/siswa/siswa.profile.service"));
class SiswaProfileController {
    constructor() {
        this.siswaProfileku = async (req, res) => {
            try {
                const siswa_service = new siswa_profile_service_1.default(req);
                const datas = await siswa_service.siswaProfileku();
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
exports.default = new SiswaProfileController();
