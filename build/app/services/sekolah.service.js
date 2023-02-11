"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importDefault(require("../models"));
// const Siswa = db.siswa;
// const DB: any = db;
const { siswa, kelas, sekolah, paket } = models_1.default;
// export const getSiswa = async (req:Request, res:Response) => {
//         try {
//             const response = await Siswa.findAll({ offset: 0, limit: 10, include: kelas });
//             return response;
//         } catch (error:any) {
//             console.log(error.message);
//         }
// };
class sekolahService {
    constructor(req) {
        this.getSekolahAll = async () => {
            var _a, _b;
            try {
                const paketDefault = await this.getPaketDefault();
                const response = await sekolah.findAll({
                    include: [
                        {
                            model: models_1.default.paket,
                        }
                    ]
                });
                for (let i = 0; i < response.length; i++) {
                    response[i].setDataValue("paket_nama", response[i].paket ? (_b = (_a = response[i]) === null || _a === void 0 ? void 0 : _a.paket) === null || _b === void 0 ? void 0 : _b.nama : paketDefault.nama);
                }
                return response;
            }
            catch (error) {
                console.log(error.message);
            }
        };
        this.Edit = async () => {
            var _a;
            try {
                const paketDefault = await this.getPaketDefault();
                const response = await sekolah.findOne({ where: { id: this.params.sekolah_id } }, {
                    include: [
                        {
                            model: models_1.default.paket,
                        }
                    ]
                });
                response.setDataValue("paket_nama", response.paket ? (_a = response === null || response === void 0 ? void 0 : response.paket) === null || _a === void 0 ? void 0 : _a.nama : paketDefault.nama);
                return response;
            }
            catch (error) {
                console.log(error.message);
            }
        };
        this.getPaketDefault = async () => {
            try {
                const response = await paket.findOne();
                return response;
            }
            catch (error) {
                console.log(error.message);
            }
        };
        this.getPaket = async (sekolah_id) => {
            try {
                const response = await paket.findOne({ where: { id: sekolah_id } });
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
