"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const siswa_service_1 = __importDefault(require("../services/siswa.service"));
// DUMMY DATA
// let data: any[] = [
//     {
//         id: 1,
//         name: "Paimin"
//     },
//     {
//         id: 2,
//         name: "Paijo"
//     },
//     {
//         id: 3,
//         name: "Joko"
//     },
// ]
class UserController {
    constructor() {
        this.index = async (req, res) => {
            const service = new siswa_service_1.default(req);
            const datas = await service.getAll();
            return res.send({
                data: datas,
                message: "Success"
            });
        };
    }
}
exports.default = new UserController();
