import { Request, Response } from 'express';
import studiv2PaketsoalService from '../../../services/studiv2/admin.studiv2.paketsoal.service';
interface IResponse {
    success: boolean,
    data: Promise<Response> | any[],
    message: null | string
}
class Studiv2PaketsoalController {
    //! PAKETSOAL
    paketsoalGetAll = async (req: Request, res: Response): Promise<Response | undefined> => {
        try {
            const service: studiv2PaketsoalService = new studiv2PaketsoalService(req);
            const datas = await service.paketsoalGetAll();
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
    paketsoalEdit = async (req: Request, res: Response): Promise<Response> => {
        try {
            const service: studiv2PaketsoalService = new studiv2PaketsoalService(req);
            const datas = await service.paketsoalEdit();

            return res.send({
                data: datas,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }
    paketsoalStore = async (req: Request, res: Response): Promise<Response> => {
        try {
            const service: studiv2PaketsoalService = new studiv2PaketsoalService(req);
            const datas = await service.paketsoalStore();

            return res.send({
                data: datas,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }
    paketsoalUpdate = async (req: Request, res: Response): Promise<Response> => {
        try {
            const service: studiv2PaketsoalService = new studiv2PaketsoalService(req);
            const datas = await service.paketsoalUpdate();

            return res.send({
                data: datas,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }
    paketsoalDelete = async (req: Request, res: Response): Promise<Response> => {
        try {
            const service: studiv2PaketsoalService = new studiv2PaketsoalService(req);
            const datas = await service.paketsoalDelete();

            return res.send({
                data: datas,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }
    //! PAKETSOAL-END

    // ! ASPEK
    aspekGetAll = async (req: Request, res: Response): Promise<Response | undefined> => {
        try {
            const service: studiv2PaketsoalService = new studiv2PaketsoalService(req);
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
            const service: studiv2PaketsoalService = new studiv2PaketsoalService(req);
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
            const service: studiv2PaketsoalService = new studiv2PaketsoalService(req);
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
            const service: studiv2PaketsoalService = new studiv2PaketsoalService(req);
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
            const service: studiv2PaketsoalService = new studiv2PaketsoalService(req);
            const datas = await service.aspekDelete();

            return res.send({
                data: datas,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }
    // ! ASPEK-END


    // ! PENILAIAN
    penilaianGet = async (req: Request, res: Response): Promise<Response> => {
        try {
            const service: studiv2PaketsoalService = new studiv2PaketsoalService(req);
            const datas = await service.penilaianGet();

            return res.send({
                data: datas,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }
    penilaianGetPerAspek = async (req: Request, res: Response): Promise<Response> => {
        try {
            const service: studiv2PaketsoalService = new studiv2PaketsoalService(req);
            const datas = await service.penilaianGetPerAspek();

            return res.send({
                data: datas,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }
    penilaianStore = async (req: Request, res: Response): Promise<Response> => {
        try {
            const service: studiv2PaketsoalService = new studiv2PaketsoalService(req);
            const datas = await service.penilaianStore();

            return res.send({
                data: datas,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }

    penilaianDelete = async (req: Request, res: Response): Promise<Response> => {
        try {
            const service: studiv2PaketsoalService = new studiv2PaketsoalService(req);
            const datas = await service.penilaianDelete();

            return res.send({
                data: datas,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }
    // ! PENILAIAN-END


    // ! ASPEK_DETAIL
    aspek_detailGetAll = async (req: Request, res: Response): Promise<Response | undefined> => {
        try {
            const service: studiv2PaketsoalService = new studiv2PaketsoalService(req);
            const datas = await service.aspek_detailGetAll();
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
    aspek_detailEdit = async (req: Request, res: Response): Promise<Response> => {
        try {
            const service: studiv2PaketsoalService = new studiv2PaketsoalService(req);
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
            const service: studiv2PaketsoalService = new studiv2PaketsoalService(req);
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
            const service: studiv2PaketsoalService = new studiv2PaketsoalService(req);
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
            const service: studiv2PaketsoalService = new studiv2PaketsoalService(req);
            const datas = await service.aspek_detailDelete();

            return res.send({
                data: datas,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }
    // ! ASPEK_DETAIL-END


    // ! ASPEK_DETAIL-SOAL
    soalGetAll = async (req: Request, res: Response): Promise<Response> => {
        try {
            const service: studiv2PaketsoalService = new studiv2PaketsoalService(req);
            const datas = await service.soalGetAll();

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
            const service: studiv2PaketsoalService = new studiv2PaketsoalService(req);
            const datas = await service.soalStore();

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
            const service: studiv2PaketsoalService = new studiv2PaketsoalService(req);
            const datas = await service.soalDelete();

            return res.send({
                data: datas,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }
    // ! ASPEK_DETAIL-SOAL-END


}

export default new Studiv2PaketsoalController();