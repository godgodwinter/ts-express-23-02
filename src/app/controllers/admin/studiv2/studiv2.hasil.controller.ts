import { Request, Response } from 'express';
import studiv2ProsesService from '../../../services/studiv2/admin.studiv2.proses.service';
import studiv2HasilService from '../../../services/studiv2/admin.studiv2.hasil.service';
import kelasService from '../../../services/mastering/kelas.v2.service';
class Studiv2HasilController {
    // ! PERSISWA
    hasilGetSiswa = async (req: Request, res: Response): Promise<Response | undefined> => {
        try {
            const proses_Service: studiv2ProsesService = new studiv2ProsesService(req);
            const hasil_Service: studiv2HasilService = new studiv2HasilService(req);
            const siswa = await proses_Service.prosesGetSiswa(parseInt(req.params.siswa_id));
            const datas = await hasil_Service.hasilGetPersiswa(parseInt(req.params.siswa_id));
            // const get_dataJurusan = await hasil_Service.get_dataJurusan(datas);

            return res.send({
                siswa: siswa,
                data: datas,
                // dataMinatbidangstudi: dataJurusanDanMinat.dataMinatbidangstudi,
                // dataJurusan: get_dataJurusan,
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

    hasilRevisiNilaiAkhir = async (req: Request, res: Response): Promise<Response | undefined> => {
        try {
            const hasil_Service: studiv2HasilService = new studiv2HasilService(req);
            const datas = await hasil_Service.hasilRevisiNilaiAkhir(parseInt(req.params.hasil_aspek_detail_id));

            return res.send({
                data: datas,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }
    // ! PERSISWA-END


    // ! PERKELAS
    hasilGetPerkelas = async (req: Request, res: Response): Promise<Response | undefined> => {
        try {
            const hasil_Service: studiv2HasilService = new studiv2HasilService(req);
            const datas = await hasil_Service.hasilGetPerkelas(parseInt(req.params.kelas_id));

            return res.send({
                data: datas,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }
    hasilGetPerkelas_exportjawaban = async (req: Request, res: Response): Promise<Response | undefined> => {
        try {
            const hasil_Service: studiv2HasilService = new studiv2HasilService(req);
            const kelas_Service: kelasService = new kelasService(req);
            const dataKelas = await kelas_Service.kelasGetWhereId(parseInt(req.params.kelas_id));
            const datasHeader = await hasil_Service.hasilGetPerkelas_exportjawaban_header();
            const datas = await hasil_Service.hasilGetPerkelas_exportjawaban(parseInt(req.params.kelas_id));

            return res.send({
                kelas: dataKelas,
                header: datasHeader,
                data: datas,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }
    hasilGeneratePerkelas = async (req: Request, res: Response): Promise<Response | undefined> => {
        try {
            const hasil_Service: studiv2HasilService = new studiv2HasilService(req);
            const datas = await hasil_Service.hasilGeneratePerkelas(parseInt(req.params.kelas_id));

            return res.send({
                data: datas,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }
    hasilDeletePerkelas = async (req: Request, res: Response): Promise<Response | undefined> => {
        try {
            const hasil_Service: studiv2HasilService = new studiv2HasilService(req);
            const datas = await hasil_Service.hasilDeletePerkelas(parseInt(req.params.kelas_id));

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

export default new Studiv2HasilController();