"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importDefault(require("../models"));
// const Siswa = db.siswa;
// const DB: any = db;
const { siswa, kelas } = models_1.default;
// export const getSiswa = async (req:Request, res:Response) => {
//         try {
//             const response = await Siswa.findAll({ offset: 0, limit: 10, include: kelas });
//             return response;
//         } catch (error:any) {
//             console.log(error.message);
//         }
// };
class siswaService {
    constructor(req) {
        this.getAll = async () => {
            // console.log('====================================');
            // console.log(DB.siswa.findAll(),this.body);
            // console.log('====================================');
            const datas = await siswa.findAll({ offset: 0, limit: 10, include: kelas });
            return datas;
        };
        this.credential = req.app.locals.credential;
        this.body = req.body;
        this.params = req.params;
    }
}
exports.default = siswaService;
