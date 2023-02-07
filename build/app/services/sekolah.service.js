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
