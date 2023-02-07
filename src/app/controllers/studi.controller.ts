import { Request, Response } from 'express';
import StudiService from '../services/studi.service';
interface IResponse {
    success: boolean,
    data: Promise<Response> | any[],
    message: null | string
}
class StudiController {
    getDataUjian = async (req: Request, res: Response): Promise<Response> => {
        try {
            const service: StudiService = new StudiService(req);
            const datas = await service.getDataUjian();

            return res.send({
                data: datas,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }


    periksaUjianAktif = async (req: Request, res: Response): Promise<Response> => {
        try {
            const service: StudiService = new StudiService(req);
            let datas: any = await service.periksaUjianAktif();

            let result: IResponse = {
                success: false,
                data: datas,
                message: "Tidak ada ujian aktif"
            }
            if (datas) {
                result.success = true;
                result.message = "Ujian aktif ditemukan"
            } else {
                datas = {
                    ujian_proses_kelas_id: null
                }
            }
            return res.send(result);

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }
    getDataUjianEdit = async (req: Request, res: Response): Promise<Response> => {
        try {
            const service: StudiService = new StudiService(req);
            let datas: any = await service.getDataUjianEdit(parseInt(req.params.ujian_proses_kelas_id));

            let result: IResponse = {
                success: false,
                data: datas,
                message: "Tidak ada ujian aktif"
            }
            if (datas) {
                result.success = true;
                result.message = "Ujian aktif ditemukan"
            } else {
                datas = {
                    ujian_proses_kelas_id: null
                }
            }
            return res.send(result);

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }


    doUjianDaftar = async (req: Request, res: Response): Promise<Response> => {
        try {
            const service: StudiService = new StudiService(req);
            let datas: any = await service.doUjianDaftar(parseInt(req.params.ujian_proses_kelas_id));

            let result: any = {
                success: false,
                data: datas,
                paketsoal_id: datas?.paketsoal_id
            }
            if (datas) {
                result.success = datas.success;
                result.data = datas.data;

            } else {
                result.data = "Kelas tidak terdaftar untuk paket ini!";
            }
            return res.send(result);

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }
    periksa_daftar = async (req: Request, res: Response): Promise<Response> => {
        try {
            const service: StudiService = new StudiService(req);
            let datas: any = await service.periksa_daftar(parseInt(req.params.ujian_proses_kelas_id));

            let result: any = {
                success: false,
                data: datas,
            }
            if (datas) {
                result.success = datas.success;
                result.data = datas.data;

            } else {
                result.data = "Siswa Belum daftar"
            }
            return res.send(result);

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }

}

export default new StudiController();