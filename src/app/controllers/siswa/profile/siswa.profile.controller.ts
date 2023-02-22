import { Request, Response } from 'express';
import sekolahService from '../../../services/mastering/sekolah.v2.service';
import siswaProfileService from '../../../services/siswa/siswa.profile.service';
interface IResponse {
    success: boolean,
    data: Promise<Response> | any[],
    message: null | string
}
class SiswaProfileController {
    siswaProfileku = async (req: Request, res: Response): Promise<Response> => {
        try {
            const siswa_service: siswaProfileService = new siswaProfileService(req);
            const datas = await siswa_service.siswaProfileku();

            return res.send({
                data: datas,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }

}

export default new SiswaProfileController();