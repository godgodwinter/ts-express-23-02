"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const models_1 = __importDefault(require("../models"));
const { katabijak, katabijakdetail } = models_1.default;
class katabijakService {
    constructor(req) {
        this.getRandom = async () => {
            try {
                const response = await katabijakdetail.findAll({
                    offset: 0, limit: 10, order: [sequelize_1.Sequelize.literal('RAND()')],
                    include: [
                        {
                            model: models_1.default.katabijak,
                        }
                    ]
                });
                return response;
            }
            catch (error) {
                console.log(error.message);
            }
        };
        this.getAll = async () => {
            try {
                const response = await katabijak.findAll();
                return response;
            }
            catch (error) {
                console.log(error.message);
            }
        };
        this.Edit = async () => {
            try {
                const response = await katabijak.findOne({ where: { id: this.params.katabijak_id } });
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
exports.default = katabijakService;
