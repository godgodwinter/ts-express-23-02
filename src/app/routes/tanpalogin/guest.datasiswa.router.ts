import { verifyToken, menuAdminOwner } from '../../middleware/auth.jwt';
import BaseRoutes from '../base.router';
import DataSiswaDeteksimasalahController from '../../controllers/siswa/datasiswa/datasiswa.deteksimasalah.controller';

class guestDatasiswaRouter extends BaseRoutes {

    public routes(): void {
        this.router.get("/guest/datasiswa/deteksimasalah/:siswa_id", DataSiswaDeteksimasalahController.getPersiswa)
    }
}


export default new guestDatasiswaRouter().router;