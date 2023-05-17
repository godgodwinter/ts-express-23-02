// import { Request, Response } from 'express';
import { verifyToken, menuAdminOwner } from '../../middleware/auth.jwt';
// import AuthController from '../../controllers/auth/auth.controller';
import BaseRoutes from '../base.router';
import adminMasteringSekolahController from '../../controllers/admin/mastering/admin.mastering.sekolah.controller';

class AdminMasteringSekolahRouter extends BaseRoutes {

    public routes(): void {
        this.router.get("/admin/sekolah", [verifyToken, menuAdminOwner], adminMasteringSekolahController.getSekolahAll)
        this.router.get("/owner/sekolah", [verifyToken, menuAdminOwner], adminMasteringSekolahController.getSekolahAll)
        this.router.get("/owner/datasekolah/:sekolah_id/kelas", [verifyToken, menuAdminOwner], adminMasteringSekolahController.getKelasWhereSekolah)

        this.router.get("/admin/sekolah/:sekolah_id", [verifyToken, menuAdminOwner], adminMasteringSekolahController.Edit)
        this.router.get("/owner/sekolah/:sekolah_id", [verifyToken, menuAdminOwner], adminMasteringSekolahController.Edit)
        // this.router.post("/auth/me", [verifyToken, menuAdminOwner], AuthController.siswaMe)
    }
}


export default new AdminMasteringSekolahRouter().router;