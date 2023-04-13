import { Request, Response } from 'express';
import redisProsesService
    from '../../../../services/studiv2/redis/redis.studiv2.proses.service';


class redisStudiv2ProsesController {
    proses_siswa_get = async (req: Request, res: Response): Promise<Response | undefined> => {
        try {
            const service: redisProsesService = new redisProsesService(req);
            const datas = await service.proses_siswa_get(parseInt(req.params.siswa_id));

            return res.send({
                data: datas,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }
    proses_siswa_store = async (req: Request, res: Response): Promise<Response | undefined> => {
        try {
            const service: redisProsesService = new redisProsesService(req);
            const datas = await service.proses_siswa_store(parseInt(req.params.siswa_id));

            return res.send({
                data: datas,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }
    proses_siswa_delete = async (req: Request, res: Response): Promise<Response | undefined> => {
        try {
            const service: redisProsesService = new redisProsesService(req);
            const datas = await service.proses_siswa_delete(parseInt(req.params.siswa_id));

            return res.send({
                data: datas,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }


    proses_kelas_store = async (req: Request, res: Response): Promise<Response | undefined> => {
        try {
            const service: redisProsesService = new redisProsesService(req);
            const datas = await service.proses_kelas_store(parseInt(req.params.kelas_id));

            return res.send({
                data: datas,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }

    proses_kelas_delete = async (req: Request, res: Response): Promise<Response | undefined> => {
        try {
            const service: redisProsesService = new redisProsesService(req);
            const datas = await service.proses_kelas_delete(parseInt(req.params.kelas_id));

            return res.send({
                data: datas,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }

}

export default new redisStudiv2ProsesController();