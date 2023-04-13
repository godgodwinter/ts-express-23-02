import { Request, Response } from 'express';
import redisPaketsoalService
    from '../../../../services/studiv2/redis/redis.studiv2.paketsoal.service';


class redisStudiv2PaketsoalController {

    index = async (req: Request, res: Response): Promise<Response | undefined> => {
        try {
            const service: redisPaketsoalService = new redisPaketsoalService(req);
            const datas = await service.testing();
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

    paketsoal_aktif_get = async (req: Request, res: Response): Promise<Response | undefined> => {
        try {
            const service: redisPaketsoalService = new redisPaketsoalService(req);
            const datas = await service.paketsoal_aktif_get();

            return res.send({
                data: datas,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }
    paketsoal_aktif_delete = async (req: Request, res: Response): Promise<Response | undefined> => {
        try {
            const service: redisPaketsoalService = new redisPaketsoalService(req);
            const datas = await service.paketsoal_aktif_delete();

            return res.send({
                data: datas,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }

    paketsoal_aktifkan = async (req: Request, res: Response): Promise<Response | undefined> => {
        try {
            const service: redisPaketsoalService = new redisPaketsoalService(req);
            const datas = await service.paketsoal_aktifkan(parseInt(req.params.paketsoal_id));

            return res.send({
                data: datas,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }
    paketsoal_store = async (req: Request, res: Response): Promise<Response | undefined> => {
        try {
            const service: redisPaketsoalService = new redisPaketsoalService(req);
            const datas = await service.paketsoal_store(parseInt(req.params.paketsoal_id));

            return res.send({
                data: datas,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }
    aspek_detail_store = async (req: Request, res: Response): Promise<Response | undefined> => {
        try {
            const service: redisPaketsoalService = new redisPaketsoalService(req);
            const datas = await service.aspek_detail_store(parseInt(req.params.aspek_detail_id));

            return res.send({
                data: datas,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }
}

export default new redisStudiv2PaketsoalController();