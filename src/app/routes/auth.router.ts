import AuthController from '../controllers/auth.controller';
import authJwt from '../middleware/auth.jwt';
import BaseRoutes from './base.router';

class AuthRoutes extends BaseRoutes {

    public routes(): void {
        // AUTH SISWA
        this.router.post("/auth/login", AuthController.siswaLogin)
        this.router.post("/auth/me", [authJwt.verifyToken], AuthController.siswaMe)
        this.router.post("/auth/me_ujian", [authJwt.verifyToken], AuthController.siswaMeUjian)
    }
}


export default new AuthRoutes().router;