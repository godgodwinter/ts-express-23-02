import { Request, Response } from 'express';
import SekolahService from '../../../services/sekolah.service';
import studiv2BanksoalService from '../../../services/studiv2/admin.studiv2.banksoal.service';
interface IResponse {
    success: boolean,
    data: Promise<Response> | any[],
    message: null | string
}
class Studiv2Banksoal {
    aspekGetAll = async (req: Request, res: Response): Promise<Response> => {
        try {
            const service: studiv2BanksoalService = new studiv2BanksoalService(req);
            const datas = await service.aspekGetAll();

            return res.send({
                data: datas,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }
    aspekEdit = async (req: Request, res: Response): Promise<Response> => {
        try {
            const service: studiv2BanksoalService = new studiv2BanksoalService(req);
            const datas = await service.aspekEdit();

            return res.send({
                data: datas,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }
    aspekStore = async (req: Request, res: Response): Promise<Response> => {
        try {
            const service: studiv2BanksoalService = new studiv2BanksoalService(req);
            const datas = await service.aspekStore();

            return res.send({
                data: datas,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }
    aspekUpdate = async (req: Request, res: Response): Promise<Response> => {
        try {
            const service: studiv2BanksoalService = new studiv2BanksoalService(req);
            const datas = await service.aspekUpdate();

            return res.send({
                data: datas,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }
    aspekDelete = async (req: Request, res: Response): Promise<Response> => {
        try {
            const service: studiv2BanksoalService = new studiv2BanksoalService(req);
            const datas = await service.aspekDelete();

            return res.send({
                data: datas,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }

    // !   ASPEK DETAIL
    aspek_detailGetAll = async (req: Request, res: Response): Promise<Response> => {
        try {
            const service: studiv2BanksoalService = new studiv2BanksoalService(req);
            const datas = await service.aspek_detailGetAll();

            return res.send({
                data: datas,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }
    aspek_detailEdit = async (req: Request, res: Response): Promise<Response> => {
        try {
            const service: studiv2BanksoalService = new studiv2BanksoalService(req);
            const datas = await service.aspek_detailEdit();

            return res.send({
                data: datas,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }
    aspek_detailStore = async (req: Request, res: Response): Promise<Response> => {
        try {
            const service: studiv2BanksoalService = new studiv2BanksoalService(req);
            const datas = await service.aspek_detailStore();

            return res.send({
                data: datas,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }
    aspek_detailUpdate = async (req: Request, res: Response): Promise<Response> => {
        try {
            const service: studiv2BanksoalService = new studiv2BanksoalService(req);
            const datas = await service.aspek_detailUpdate();

            return res.send({
                data: datas,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }
    aspek_detailDelete = async (req: Request, res: Response): Promise<Response> => {
        try {
            const service: studiv2BanksoalService = new studiv2BanksoalService(req);
            const datas = await service.aspek_detailDelete();

            return res.send({
                data: datas,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }

}

export default new Studiv2Banksoal();