import { Request, Response } from 'express';
import studiv2ProsesService from '../../../services/studiv2/admin.studiv2.proses.service';
class Studiv2ProsesController {
    // ! PERSISWA
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
            // periksa jika siswa_id di table proses sudah ada maka skip /return false
            const isSiswaSudahAdaDiProses = await proses_Service.prosesPeriksaIsSiswaSudahAda(parseInt(req.params.siswa_id), req.body.tgl_ujian);
            // console.log(isSiswaSudahAdaDiProses);

            // return res.send({
            //     data: isSiswaSudahAdaDiProses,
            //     message: "Success"
            // });
            if (isSiswaSudahAdaDiProses) {
                return res.status(200).send({
                    status: false,
                    data: "Data ujian Siswa sudah ada",
                    message: "Failed"
                });
            }
            const datas = await proses_Service.prosesStorePerSiswa(parseInt(req.params.siswa_id), parseInt(req.params.paketsoal_id), req.body);
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


    // ! PERSISWA-END

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
    prosesStoreSiswaPerKelas = async (req: Request, res: Response): Promise<Response | undefined> => {
        try {
            const proses_Service: studiv2ProsesService = new studiv2ProsesService(req);
            const datas = await proses_Service.prosesStoreSiswaPerKelas(parseInt(req.params.kelas_id), parseInt(req.params.paketsoal_id), req.body);
            // setTimeout(()=>{},5000)


            return res.send({
                data: datas,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }
    prosesDeleteSiswaPerKelas = async (req: Request, res: Response): Promise<Response | undefined> => {
        try {
            const proses_Service: studiv2ProsesService = new studiv2ProsesService(req);
            const datas = await proses_Service.prosesDeleteSiswaPerKelas(parseInt(req.params.kelas_id));
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