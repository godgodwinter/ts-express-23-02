import { Request, Response } from 'express';
import SekolahService from '../../../services/sekolah.service';
import studiv2BanksoalService from '../../../services/studiv2/admin.studiv2.banksoal.service';
interface IResponse {
    success: boolean,
    data: Promise<Response> | any[],
    message: null | string
}
class Studiv2Banksoal {
    aspekGetAll = async (req: Request, res: Response): Promise<Response | undefined> => {
        try {
            const service: studiv2BanksoalService = new studiv2BanksoalService(req);
            const datas = await service.aspekGetAll();
            // setTimeout(()=>{},5000)

            // ! DONT DELETE : EXAMPLE DELAY TESTING
            // const fn_delay_response = (arg:any)=>{
            //     console.log(`arg was => ${arg}`);
            //     // return res.status(500).send({ message: "error.message" });
            //     return res.send({
            //         data: datas,
            //         message: "Success"
            //     });
            //   }

            //   setTimeout(fn_delay_response, 3000, 'argumen example');
            // ! DONT DELETE : EXAMPLE DELAY TESTING

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
    // !   ASPEK DETAIL-END


    // !   SOAL
    soalGetAll = async (req: Request, res: Response): Promise<Response> => {
        try {
            const service: studiv2BanksoalService = new studiv2BanksoalService(req);
            const aspek_detail = await service.aspek_detailEdit();
            const datas = await service.soalGetAll();

            return res.send({
                data: datas,
                aspek_detail: aspek_detail,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }

    soalEdit = async (req: Request, res: Response): Promise<Response> => {
        try {
            const service: studiv2BanksoalService = new studiv2BanksoalService(req);
            const datas = await service.soalEdit();

            return res.send({
                data: datas,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }
    soalStore = async (req: Request, res: Response): Promise<Response> => {
        try {
            const service: studiv2BanksoalService = new studiv2BanksoalService(req);
            const datas = await service.soalStore();

            return res.send({
                data: datas,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }
    soalUpdate = async (req: Request, res: Response): Promise<Response> => {
        try {
            const service: studiv2BanksoalService = new studiv2BanksoalService(req);
            const datas = await service.soalUpdate();

            return res.send({
                data: datas,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }
    soalDelete = async (req: Request, res: Response): Promise<Response> => {
        try {
            const service: studiv2BanksoalService = new studiv2BanksoalService(req);
            const datas = await service.soalDelete();

            return res.send({
                data: datas,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }
    // !   SOAL-END

    // !IMPORT SOAL

    importSoalPeriksa = async (req: Request, res: Response): Promise<Response> => {
        try {
            const service: studiv2BanksoalService = new studiv2BanksoalService(req);
            const datas = await service.importSoalPeriksa();

            return res.send({
                data: datas,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }
    // !IMPORT SOAL-END

}

export default new Studiv2Banksoal();