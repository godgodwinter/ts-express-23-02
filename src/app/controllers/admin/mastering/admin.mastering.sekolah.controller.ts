import { Request, Response } from 'express';
import kelasService from '../../../services/mastering/kelas.v2.service';
import SekolahService from '../../../services/sekolah.service';
import siswaService from '../../../services/mastering/siswa.v2.service';
import sekolahService from '../../../services/mastering/sekolah.v2.service';
interface IResponse {
    success: boolean,
    data: Promise<Response> | any[],
    message: null | string
}
class AdminMasteringSekolahController {
    getSekolahAll = async (req: Request, res: Response): Promise<Response> => {
        try {
            const Sekolah_Service: sekolahService = new sekolahService(req);
            const datas = await Sekolah_Service.sekolahGetAll();

            return res.send({
                data: datas,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }
    Edit = async (req: Request, res: Response): Promise<Response> => {
        try {
            const sekolah_Service: sekolahService = new sekolahService(req);
            const datas = await sekolah_Service.sekolahGetWhereId(parseInt(req.params.sekolah_id));

            return res.send({
                data: datas,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }

    getKelasWhereSekolah = async (req: Request, res: Response): Promise<Response> => {
        try {
            const kelas_Service: kelasService = new kelasService(req);
            const datas = await kelas_Service.kelasGetWhereSekolah(parseInt(req.params.sekolah_id));

            const sekolah_Service: sekolahService = new sekolahService(req);
            const dataSekolah = await sekolah_Service.sekolahGetWhereId(parseInt(req.params.sekolah_id));
            return res.send({
                data: datas,
                sekolah: dataSekolah,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }

    getSiswaWhereKelas = async (req: Request, res: Response): Promise<Response> => {
        try {
            const siswa_Service: siswaService = new siswaService(req);
            const datas = await siswa_Service.siswaGetWhereKelas(parseInt(req.params.kelas_id));

            const kelas_Service: kelasService = new kelasService(req);
            const dataKelas = await kelas_Service.kelasGetWhereId(parseInt(req.params.kelas_id));

            const sekolah_Service: sekolahService = new sekolahService(req);
            const dataSekolah = await sekolah_Service.sekolahGetWhereId(parseInt(req.params.sekolah_id));
            return res.send({
                data: datas,
                kelas: dataKelas,
                sekolah: dataSekolah,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }

}

export default new AdminMasteringSekolahController();