// import { Request, Response } from 'express';
import { verifyToken, menuAdminOwner } from '../../../middleware/auth.jwt';
// import AuthController from '../../controllers/auth/auth.controller';
import BaseRoutes from '../../base.router';
import adminMasteringSekolahController from '../../../controllers/admin/mastering/admin.mastering.sekolah.controller';

class AdminMasteringSekolahRouterV2 extends BaseRoutes {

    public routes(): void {
        // this.router.get("/sekolah", [], adminMasteringSekolahController.getSekolahAll)
        this.router.get("/sekolah", [verifyToken, menuAdminOwner], adminMasteringSekolahController.getSekolahAll)
        this.router.post("/sekolah", [verifyToken, menuAdminOwner], adminMasteringSekolahController.sekolahStore)
        this.router.get("/sekolah/:sekolah_id", [verifyToken, menuAdminOwner], adminMasteringSekolahController.sekolahGetWhereId)
        this.router.put("/sekolah/:sekolah_id", [verifyToken, menuAdminOwner], adminMasteringSekolahController.sekolahUpdateWhereId)
        this.router.delete("/sekolah/:sekolah_id", [verifyToken, menuAdminOwner], adminMasteringSekolahController.delete_sekolahGetWhereId)
        this.router.get("/sekolah/:sekolah_id/kelas", [verifyToken, menuAdminOwner], adminMasteringSekolahController.getKelasWhereSekolah)
        this.router.get("/sekolah/:sekolah_id/kelas/:kelas_id/siswa", [verifyToken, menuAdminOwner], adminMasteringSekolahController.getSiswaWhereKelas)


    }
}


export default new AdminMasteringSekolahRouterV2().router;