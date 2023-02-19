import { sequelize_studi_v2 } from '../../models/index';

import { db_studi_v2 } from "../../models";
import { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Sequelize } from "sequelize";

const moment = require('moment');
const localization = require('moment/locale/id')
moment.updateLocale("id", localization);

const { studi_v2_paketsoal } = db_studi_v2;
class studiv2PaketsoalService {

    body: Request['body'];
    params: Request['params'];

    constructor(req: Request) {
        this.body = req.body;
        this.params = req.params;
    }

    //!ASPEK
    aspekGetAll = async () => {
        try {
            const response = await studi_v2_paketsoal.findAll();
            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }

}

export default studiv2PaketsoalService;