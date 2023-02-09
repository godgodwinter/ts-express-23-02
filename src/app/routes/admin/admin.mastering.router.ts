import { Request, Response } from 'express';
import { menuSiswa, verifyToken, menuAdminOwner } from './../../middleware/auth.jwt';
import AuthController from '../../controllers/auth/auth.controller';
import BaseRoutes from '../base.router';
import adminMasteringSekolahController from '../../controllers/admin/mastering/admin.mastering.sekolah.controller';

class AdminMasteringRouter extends BaseRoutes {

    public routes(): void {
        // AUTH SISWA
        this.router.get("/admin/sekolah", [verifyToken, menuAdminOwner], adminMasteringSekolahController.getSekolahAll)
        // this.router.post("/auth/me", [verifyToken, menuAdminOwner], AuthController.siswaMe)
    }
}


export default new AdminMasteringRouter().router;