import { Request, Response } from 'express';
import studiv2ProsesService from '../../../services/studiv2/admin.studiv2.proses.service';
class Studiv2ProsesController {
    //! PERKELAS
    prosesGetSiswaPerKelas = async (req: Request, res: Response): Promise<Response | undefined> => {
        try {
            const proses_Service: studiv2ProsesService = new studiv2ProsesService(req);
            const datas = await proses_Service.prosesGetSiswaPerKelas(parseInt(req.params.kelas_id));
            // setTimeout(()=>{},5000)


            return res.send({
                data: datas,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }
    // ! PERKELAS-END
    // ! PERKELAS
    prosesGetSiswa = async (req: Request, res: Response): Promise<Response | undefined> => {
        try {
            const proses_Service: studiv2ProsesService = new studiv2ProsesService(req);
            const datas = await proses_Service.prosesGetSiswa(parseInt(req.params.kelas_id));
            // setTimeout(()=>{},5000)


            return res.send({
                data: datas,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }
    prosesStorePerSiswa = async (req: Request, res: Response): Promise<Response | undefined> => {
        try {
            const proses_Service: studiv2ProsesService = new studiv2ProsesService(req);
            const datas = await proses_Service.prosesStorePerSiswa(parseInt(req.params.kelas_id), parseInt(req.params.paketsoal_id), req.body);
            // setTimeout(()=>{},5000)


            return res.send({
                data: datas,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }
    prosesDeletePersiswa = async (req: Request, res: Response): Promise<Response | undefined> => {
        try {
            const proses_Service: studiv2ProsesService = new studiv2ProsesService(req);
            const datas = await proses_Service.prosesDeletePersiswa(parseInt(req.params.siswa_id), parseInt(req.params.proses_id));
            // setTimeout(()=>{},5000)


            return res.send({
                data: datas,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }


    // ! PERKELAS-END


}

export default new Studiv2ProsesController();