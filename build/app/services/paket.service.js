"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importDefault(require("../models"));
const { paket } = models_1.default;
class paketService {
    constructor(req) {
        this.getAll = async () => {
            try {
                const response = await paket.findAll();
                return response;
            }
            catch (error) {
                console.log(error.message);
            }
        };
        this.Edit = async () => {
            try {
                const response = await paket.findOne({ where: { id: this.params.paket_id } });
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
exports.default = paketService;
