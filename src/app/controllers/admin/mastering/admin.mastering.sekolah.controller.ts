import { Request, Response } from 'express';
import SekolahService from '../../../services/sekolah.service';
interface IResponse {
    success: boolean,
    data: Promise<Response> | any[],
    message: null | string
}
class AdminMasteringSekolahController {
    getSekolahAll = async (req: Request, res: Response): Promise<Response> => {
        try {
            const service: SekolahService = new SekolahService(req);
            const datas = await service.getSekolahAll();

            return res.send({
                data: datas,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }

}

export default new AdminMasteringSekolahController();