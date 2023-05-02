import { Request, Response } from 'express';
import siswaUjianstudiService from '../../../services/siswa/siswa.ujianstudi.service';
interface IResponse {
    success: boolean,
    data: Promise<Response> | any[],
    message: null | string
}
class SiswaUjianstudiv3Controller {
    periksaUjianAktif = async (req: Request, res: Response): Promise<Response> => {
        try {
            const siswa_service: siswaUjianstudiService = new siswaUjianstudiService(req);

            const data_proses = await siswa_service.getProses();
            if (data_proses) {
                const data_aspek_detail = await siswa_service.periksaUjianAktif(data_proses.id);
                return res.send({
                    data: data_aspek_detail,
                    proses: data_proses,
                    message: "Success"
                });

            }
            return res.send({
                data: null,
                proses: null,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }
    getAspekDetail_detail = async (req: Request, res: Response): Promise<Response> => {
        try {
            const siswa_service: siswaUjianstudiService = new siswaUjianstudiService(req);

            const data_aspek_detail = await siswa_service.getAspekDetail_detail(parseInt(req.params.studi_v2_proses_aspek_detail_id));
            return res.send({
                data: data_aspek_detail,
                message: "Success"
            });

            return res.send({
                data: null,
                proses: null,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }
    getAspekDetail = async (req: Request, res: Response): Promise<Response> => {
        try {
            const siswa_service: siswaUjianstudiService = new siswaUjianstudiService(req);

            const data_proses = await siswa_service.getProses();
            if (data_proses) {
                const data_aspek_detail = await siswa_service.getAspekDetail(data_proses.id);
                return res.send({
                    data: data_aspek_detail,
                    proses: data_proses,
                    message: "Success"
                });

            }
            return res.send({
                data: null,
                proses: null,
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

export default new SiswaUjianstudiv3Controller();