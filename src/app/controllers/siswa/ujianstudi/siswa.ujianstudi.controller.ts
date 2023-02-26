import { Request, Response } from 'express';
import sekolahService from '../../../services/mastering/sekolah.v2.service';
import siswaProfileService from '../../../services/siswa/siswa.profile.service';
import siswaUjianstudiService from '../../../services/siswa/siswa.ujianstudi.service';
interface IResponse {
    success: boolean,
    data: Promise<Response> | any[],
    message: null | string
}
class SiswaProfileController {
    getAspekDetail = async (req: Request, res: Response): Promise<Response> => {
        try {
            const siswa_service: siswaUjianstudiService = new siswaUjianstudiService(req);

            const data_proses = await siswa_service.getProses();
            const data_aspek_detail = await siswa_service.getAspekDetail(data_proses.id);

            return res.send({
                data: data_aspek_detail,
                proses: data_proses,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }
    doMulai = async (req: Request, res: Response): Promise<Response> => {
        try {
            const siswa_service: siswaUjianstudiService = new siswaUjianstudiService(req);

            // const data_proses = await siswa_service.getProses();
            const res_do_mulai = await siswa_service.doMulai();

            return res.send({
                data: res_do_mulai,
                // proses: data_proses,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }
    doFinish = async (req: Request, res: Response): Promise<Response> => {
        try {
            const siswa_service: siswaUjianstudiService = new siswaUjianstudiService(req);

            // const data_proses = await siswa_service.getProses();
            const res_do_mulai = await siswa_service.doFinish();

            return res.send({
                data: res_do_mulai,
                // proses: data_proses,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }
    doJawab = async (req: Request, res: Response): Promise<Response> => {
        try {
            const siswa_service: siswaUjianstudiService = new siswaUjianstudiService(req);

            // const data_proses = await siswa_service.getProses();
            const res_do_mulai = await siswa_service.doJawab();

            return res.send({
                data: res_do_mulai,
                // proses: data_proses,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }

}

export default new SiswaProfileController();