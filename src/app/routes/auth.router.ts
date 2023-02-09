import { menuSiswa, verifyToken } from './../middleware/auth.jwt';
import AuthController from '../controllers/auth.controller';
import BaseRoutes from './base.router';

class AuthRoutes extends BaseRoutes {

    public routes(): void {
        // AUTH SISWA
        this.router.post("/auth/login", AuthController.siswaLogin)
        this.router.post("/auth/me", [verifyToken, menuSiswa], AuthController.siswaMe)
        this.router.post("/auth/me_ujian", [verifyToken, menuSiswa], AuthController.siswaMeUjian)
    }
}


export default new AuthRoutes().router;