import { Request, Response } from 'express';

import siswaService from '../services/siswa.service';
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
    index = async (req: Request, res: Response): Promise<Response> => {

        const service: siswaService = new siswaService(req);
        const datas = await service.getAll();

        return res.send({
            data: datas,
            message: "Success"
        });

    }
}

export default new UserController();