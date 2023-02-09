import { Request, Response } from 'express';
import { menuSiswa, verifyToken, menuAdminOwner } from './../../middleware/auth.jwt';
import AuthController from '../../controllers/auth/auth.controller';
import BaseRoutes from '../base.router';

class AdminMasteringRouter extends BaseRoutes {

    public routes(): void {
        // AUTH SISWA
        this.router.get("/admin/sekolah", [verifyToken, menuAdminOwner], (req: Request, res: Response) => {
            res.send({
                success: true,
                message: 'getSekolah'
            });
        })
        // this.router.post("/auth/me", [verifyToken, menuAdminOwner], AuthController.siswaMe)
    }
}


export default new AdminMasteringRouter().router;