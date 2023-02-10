import { Request, Response } from 'express';
import adminStudiProsesService from '../../../services/admin.studi.proses.service';
class AdminStudiProsesController {
    getAllSekolah = async (req: Request, res: Response): Promise<Response> => {
        try {
            const service: adminStudiProsesService = new adminStudiProsesService(req);
            const datas = await service.studi_proses_getSekolah();

            return res.send({
                data: datas,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }
    getAllKelasPerSekolah = async (req: Request, res: Response): Promise<Response> => {
        try {
            const service: adminStudiProsesService = new adminStudiProsesService(req);
            const datas = await service.studi_proses_getAllKelasPerSekolah();

            return res.send({
                data: datas,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }
    getAllSiswaPerKelas = async (req: Request, res: Response): Promise<Response> => {
        try {
            const service: adminStudiProsesService = new adminStudiProsesService(req);
            const datas = await service.studi_proses_getAllSiswaPerKelas();

            return res.send({
                data: datas,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }
    getAllKategoriPerSiswa = async (req: Request, res: Response): Promise<Response> => {
        try {
            const service: adminStudiProsesService = new adminStudiProsesService(req);
            const datas = await service.studi_proses_getAllKategoriPerSiswa();

            return res.send({
                data: datas,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }

    // !RESET WAKTU
    doResetWaktu = async (req: Request, res: Response): Promise<Response> => {
        try {
            const service: adminStudiProsesService = new adminStudiProsesService(req);
            const datas = await service.doResetWaktu();

            return res.send({
                data: datas,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }
    doResetAll = async (req: Request, res: Response): Promise<Response> => {
        try {
            const service: adminStudiProsesService = new adminStudiProsesService(req);
            const datas = await service.doResetWaktu();

            return res.send({
                data: datas,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }
    doResetSalah = async (req: Request, res: Response): Promise<Response> => {
        try {
            const service: adminStudiProsesService = new adminStudiProsesService(req);
            const datas = await service.doResetSalah();

            return res.send({
                data: datas,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }
}

export default new AdminStudiProsesController();