"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin_studiv2_banksoal_service_1 = __importDefault(require("../../../services/studiv2/admin.studiv2.banksoal.service"));
class Studiv2Banksoal {
    constructor() {
        this.aspekGetAll = async (req, res) => {
            try {
                const service = new admin_studiv2_banksoal_service_1.default(req);
                const datas = await service.aspekGetAll();
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
        this.aspekEdit = async (req, res) => {
            try {
                const service = new admin_studiv2_banksoal_service_1.default(req);
                const datas = await service.aspekEdit();
                return res.send({
                    data: datas,
                    message: "Success"
                });
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
        this.aspekStore = async (req, res) => {
            try {
                const service = new admin_studiv2_banksoal_service_1.default(req);
                const datas = await service.aspekStore();
                return res.send({
                    data: datas,
                    message: "Success"
                });
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
        this.aspekUpdate = async (req, res) => {
            try {
                const service = new admin_studiv2_banksoal_service_1.default(req);
                const datas = await service.aspekUpdate();
                return res.send({
                    data: datas,
                    message: "Success"
                });
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
        this.aspekDelete = async (req, res) => {
            try {
                const service = new admin_studiv2_banksoal_service_1.default(req);
                const datas = await service.aspekDelete();
                return res.send({
                    data: datas,
                    message: "Success"
                });
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
        // !   ASPEK DETAIL
        this.aspek_detailGetAll = async (req, res) => {
            try {
                const service = new admin_studiv2_banksoal_service_1.default(req);
                const datas = await service.aspek_detailGetAll();
                return res.send({
                    data: datas,
                    message: "Success"
                });
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
        this.aspek_detailEdit = async (req, res) => {
            try {
                const service = new admin_studiv2_banksoal_service_1.default(req);
                const datas = await service.aspek_detailEdit();
                return res.send({
                    data: datas,
                    message: "Success"
                });
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
        this.aspek_detailStore = async (req, res) => {
            try {
                const service = new admin_studiv2_banksoal_service_1.default(req);
                const datas = await service.aspek_detailStore();
                return res.send({
                    data: datas,
                    message: "Success"
                });
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
        this.aspek_detailUpdate = async (req, res) => {
            try {
                const service = new admin_studiv2_banksoal_service_1.default(req);
                const datas = await service.aspek_detailUpdate();
                return res.send({
                    data: datas,
                    message: "Success"
                });
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
        this.aspek_detailDelete = async (req, res) => {
            try {
                const service = new admin_studiv2_banksoal_service_1.default(req);
                const datas = await service.aspek_detailDelete();
                return res.send({
                    data: datas,
                    message: "Success"
                });
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
        // !   ASPEK DETAIL-END
        // !   SOAL
        this.soalGetAll = async (req, res) => {
            try {
                const service = new admin_studiv2_banksoal_service_1.default(req);
                const aspek_detail = await service.aspek_detailEdit();
                const datas = await service.soalGetAll();
                return res.send({
                    data: datas,
                    aspek_detail: aspek_detail,
                    message: "Success"
                });
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
        this.soalEdit = async (req, res) => {
            try {
                const service = new admin_studiv2_banksoal_service_1.default(req);
                const datas = await service.soalEdit();
                return res.send({
                    data: datas,
                    message: "Success"
                });
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
        this.soalStore = async (req, res) => {
            try {
                const service = new admin_studiv2_banksoal_service_1.default(req);
                const datas = await service.soalStore();
                return res.send({
                    data: datas,
                    message: "Success"
                });
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
        this.soalUpdate = async (req, res) => {
            try {
                const service = new admin_studiv2_banksoal_service_1.default(req);
                const datas = await service.soalUpdate();
                return res.send({
                    data: datas,
                    message: "Success"
                });
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
        this.soalDelete = async (req, res) => {
            try {
                const service = new admin_studiv2_banksoal_service_1.default(req);
                const datas = await service.soalDelete();
                return res.send({
                    data: datas,
                    message: "Success"
                });
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
        // !   SOAL-END
        // !IMPORT SOAL
        this.importSoalPeriksa = async (req, res) => {
            try {
                const service = new admin_studiv2_banksoal_service_1.default(req);
                const datas = await service.importSoalPeriksa();
                return res.send({
                    data: datas,
                    message: "Success"
                });
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
        // !IMPORT SOAL-END
    }
}
exports.default = new Studiv2Banksoal();
