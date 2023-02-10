
import db from "../models";
import { Request } from 'express';

const { paket } = db;
class paketService {

    body: Request['body'];
    params: Request['params'];

    constructor(req: Request) {
        this.body = req.body;
        this.params = req.params;
    }

    getAll = async () => {
        try {
            const response = await paket.findAll();
            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }

    Edit = async () => {
        try {
            const response = await paket.findOne(
                { where: { id: this.params.paket_id } },
            );

            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }

}

export default paketService;