import { Request, Response } from 'express';
import StudiService from '../services/studi.service';
class StudiController {
    getDataUjian = async (req: Request, res: Response): Promise<Response> => {
        try {
            const service: StudiService = new StudiService(req);
            const datas = await service.getDataUjian();

            return res.send({
                data: datas,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }

}

export default new StudiController();