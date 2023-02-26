import { verifyToken, menuSiswa } from '../../middleware/auth.jwt';
import BaseRoutes from '../base.router';
import siswaUjianstudiController from '../../controllers/siswa/ujianstudi/siswa.ujianstudi.controller';

class siswaUjianstudiRouter extends BaseRoutes {

    public routes(): void {
        this.router.get("/aspek_detail", [verifyToken, menuSiswa], siswaUjianstudiController.getAspekDetail)
        this.router.post("/aspek_detail/:aspek_detail_id/mulai", [verifyToken, menuSiswa], siswaUjianstudiController.doMulai)
        this.router.post("/aspek_detail/jawab/:soal_id", [verifyToken, menuSiswa], siswaUjianstudiController.doJawab)
        this.router.post("/aspek_detail/:aspek_detail_id/finish", [verifyToken, menuSiswa], siswaUjianstudiController.doFinish)
        // this.router.post("/auth/me", [verifyToken, menuAdminOwner], AuthController.siswaMe)
    }
}


export default new siswaUjianstudiRouter().router;