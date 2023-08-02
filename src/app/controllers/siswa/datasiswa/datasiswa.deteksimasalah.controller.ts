import { Request, Response } from 'express';
import siswaDataSiswaService from '../../../services/siswa/siswa.datasiswa.service';
class DataSiswaDeteksimasalahController {
    getPersiswa = async (req: Request, res: Response): Promise<Response> => {
        try {
            const service: siswaDataSiswaService = new siswaDataSiswaService(req);
            const datas = await service.get_deteksimasalah_persiswa(parseInt(req.params.siswa_id));

            return res.send({
                data: datas,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }
    getPerkelas = async (req: Request, res: Response): Promise<Response> => {
        try {
            const service: siswaDataSiswaService = new siswaDataSiswaService(req);
            const datas = await service.get_deteksimasalah_perkelas(parseInt(req.params.kelas_id));

            return res.send({
                data: datas,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }
    getPerkelas_full = async (req: Request, res: Response): Promise<Response> => {
        try {
            const service: siswaDataSiswaService = new siswaDataSiswaService(req);
            const datas = await service.get_deteksimasalah_perkelas_full(parseInt(req.params.kelas_id));

            return res.send({
                data: datas,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }


}

export default new DataSiswaDeteksimasalahController();