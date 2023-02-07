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

}

export default new StudiController();