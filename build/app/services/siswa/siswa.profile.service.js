"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importDefault(require("../../models"));
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
class siswaProfileService {
    constructor(req) {
        this.siswaProfileku = async () => {
            var _a, _b;
            try {
                const response = await siswa.scope('withoutPass').findOne({
                    where: { id: this.meId, deleted_at: null },
                    include: [
                        { model: models_1.default.kelas, attributes: ['id', 'nama'], where: { deleted_at: null } },
                        { model: models_1.default.sekolah, attributes: ['id', 'nama'], where: { deleted_at: null } },
                    ],
                });
                response.setDataValue("kelas_nama", (_a = response === null || response === void 0 ? void 0 : response.kelas) === null || _a === void 0 ? void 0 : _a.nama);
                response.setDataValue("sekolah_nama", (_b = response === null || response === void 0 ? void 0 : response.sekolah) === null || _b === void 0 ? void 0 : _b.nama);
                return response;
            }
            catch (error) {
                console.log(error.message);
            }
        };
        this.meId = req.app.locals.meId;
        this.body = req.body;
        this.params = req.params;
    }
}
exports.default = siswaProfileService;
