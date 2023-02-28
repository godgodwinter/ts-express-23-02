import { Request, Response } from 'express';
import studiv2ProsesService from '../../../services/studiv2/admin.studiv2.proses.service';
import studiv2HasilService from '../../../services/studiv2/admin.studiv2.hasil.service';
class Studiv2HasilController {
    // ! PERSISWA
    hasilGetSiswa = async (req: Request, res: Response): Promise<Response | undefined> => {
        try {
            const proses_Service: studiv2ProsesService = new studiv2ProsesService(req);
            const hasil_Service: studiv2HasilService = new studiv2HasilService(req);
            const siswa = await proses_Service.prosesGetSiswa(parseInt(req.params.siswa_id));
            const datas = await hasil_Service.hasilGetPersiswa(parseInt(req.params.siswa_id));

            return res.send({
                siswa: siswa,
                data: datas,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }
    hasilGeneratePersiswa = async (req: Request, res: Response): Promise<Response | undefined> => {
        try {
            const hasil_Service: studiv2HasilService = new studiv2HasilService(req);
            const datas = await hasil_Service.hasilGeneratePersiswa(parseInt(req.params.siswa_id));

            return res.send({
                data: datas,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }
    hasilDeletePersiswa = async (req: Request, res: Response): Promise<Response | undefined> => {
        try {
            const hasil_Service: studiv2HasilService = new studiv2HasilService(req);
            const datas = await hasil_Service.hasilDeletePersiswa(parseInt(req.params.siswa_id));

            return res.send({
                data: datas,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }
    // ! PERSISWA-END


}

export default new Studiv2HasilController();