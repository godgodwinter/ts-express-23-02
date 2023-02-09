import { menuSiswa, verifyToken, menuAdminOwner } from './../middleware/auth.jwt';
import AuthController from '../controllers/auth.controller';
import BaseRoutes from './base.router';

class AuthRoutes extends BaseRoutes {

    public routes(): void {
        // AUTH SISWA
        this.router.post("/siswa/auth/login", AuthController.siswaLogin)
        this.router.post("/siswa/auth/me", [verifyToken, menuSiswa], AuthController.siswaMe)
        this.router.post("/siswa/auth/me_ujian", [verifyToken, menuSiswa], AuthController.siswaMeUjian)

        // AUTH SISWA
        this.router.post("/admin/auth/login", AuthController.adminLogin)
        this.router.post("/admin/auth/me", [verifyToken, menuAdminOwner], AuthController.siswaMe)
        this.router.post("/admin/auth/me_ujian", [verifyToken, menuAdminOwner], AuthController.siswaMeUjian)
    }
}


export default new AuthRoutes().router;