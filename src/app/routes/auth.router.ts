import { menuSiswa, verifyToken, menuAdminOwner } from './../middleware/auth.jwt';
import AuthController from '../controllers/auth/auth.controller';
import BaseRoutes from './base.router';
import authSiswaController from '../controllers/auth/auth.siswa.controller';
import authOwnerController from '../controllers/auth/auth.owner.controller';

class AuthRoutes extends BaseRoutes {

    public routes(): void {
        // AUTH SISWA
        this.router.post("/siswa/auth/login", authSiswaController.siswaLogin)
        this.router.post("/siswa/auth/me", [verifyToken, menuSiswa], authSiswaController.siswaMe)
        this.router.post("/siswa/auth/me_ujian", [verifyToken, menuSiswa], authSiswaController.siswaMeUjian)

        // AUTH ADMIN
        this.router.post("/admin/auth/login", AuthController.adminLogin)
        // this.router.post("/admin/auth/me", [verifyToken, menuAdminOwner], AuthController.siswaMe)
        // this.router.post("/admin/auth/me_ujian", [verifyToken, menuAdminOwner], AuthController.siswaMeUjian)

        // AUTH OWNER
        this.router.post("/owner/auth/login", authOwnerController.ownerLogin)

    }
}


export default new AuthRoutes().router;