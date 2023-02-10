import { Request, Response } from 'express';
import katabijakService from '../../../services/katabijak.service';
class AdminMasteringKatabijakController {
    getRandom = async (req: Request, res: Response): Promise<Response> => {
        try {
            const service: katabijakService = new katabijakService(req);
            const datas = await service.getRandom();

            return res.send({
                data: datas,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }
    getAll = async (req: Request, res: Response): Promise<Response> => {
        try {
            const service: katabijakService = new katabijakService(req);
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
            const service: katabijakService = new katabijakService(req);
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

export default new AdminMasteringKatabijakController();