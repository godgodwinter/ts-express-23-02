import { Request, Response } from 'express';
import paketService from '../../../services/paket.service';
class AdminMasteringPaketController {

    getAll = async (req: Request, res: Response): Promise<Response> => {
        try {
            const service: paketService = new paketService(req);
            const datas = await service.getAll();

            return res.send({
                data: datas,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }
    Edit = async (req: Request, res: Response): Promise<Response> => {
        try {
            const service: paketService = new paketService(req);
            const datas = await service.Edit();

            return res.send({
                data: datas,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }

}

export default new AdminMasteringPaketController();