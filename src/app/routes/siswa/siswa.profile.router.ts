// import { Request, Response } from 'express';
import { verifyToken, menuSiswa } from '../../middleware/auth.jwt';
// import AuthController from '../../controllers/auth/auth.controller';
import BaseRoutes from '../base.router';
import siswaProfileController from '../../controllers/siswa/profile/siswa.profile.controller';

class SiswaProfileRouter extends BaseRoutes {

    public routes(): void {
        this.router.get("/profile", [verifyToken, menuSiswa], siswaProfileController.siswaProfileku)
        // this.router.post("/auth/me", [verifyToken, menuAdminOwner], AuthController.siswaMe)
    }
}


export default new SiswaProfileRouter().router;