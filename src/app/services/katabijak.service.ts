import { Sequelize } from 'sequelize';
import db from "../models";
import { Request } from 'express';

const { katabijak, katabijakdetail } = db;
class katabijakService {

    body: Request['body'];
    params: Request['params'];

    constructor(req: Request) {
        this.body = req.body;
        this.params = req.params;
    }

    getRandom = async () => {
        try {
            const response = await katabijakdetail.findAll({
                offset: 0, limit: 10, order: [Sequelize.literal('RAND()')],
                include: [
                    {
                        model: db.katabijak,
                    }
                ]
            });
            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }
    getAll = async () => {
        try {
            const response = await katabijak.findAll();
            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }

    Edit = async () => {
        try {
            const response = await katabijak.findOne(
                { where: { id: this.params.katabijak_id } },
            );

            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }

}

export default katabijakService;