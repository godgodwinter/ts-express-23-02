import { verifyToken, menuSiswa } from '../../middleware/auth.jwt';
import BaseRoutes from '../base.router';
import siswaUjianstudiController from '../../controllers/siswa/ujianstudi/siswa.ujianstudi.controller';

class siswaUjianstudiRouter extends BaseRoutes {

    public routes(): void {
        this.router.get("/aspek_detail", [verifyToken, menuSiswa], siswaUjianstudiController.getAspekDetail)
        // this.router.post("/auth/me", [verifyToken, menuAdminOwner], AuthController.siswaMe)
    }
}


export default new siswaUjianstudiRouter().router;