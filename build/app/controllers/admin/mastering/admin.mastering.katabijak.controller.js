"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const katabijak_service_1 = __importDefault(require("../../../services/katabijak.service"));
class AdminMasteringKatabijakController {
    constructor() {
        this.getRandom = async (req, res) => {
            try {
                const service = new katabijak_service_1.default(req);
                const datas = await service.getRandom();
                return res.send({
                    data: datas,
                    message: "Success"
                });
            }
            catch (error) {
                return res.status(500).send({ message: error.message });
            }
        };
        this.getAll = async (req, res) => {
            try {
                const service = new katabijak_service_1.default(req);
                const datas = await service.getAll();
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
                const service = new katabijak_service_1.default(req);
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
exports.default = new AdminMasteringKatabijakController();
