import { verifyToken, menuAdminOwner } from '../../middleware/auth.jwt';
import BaseRoutes from '../base.router';
import adminMasteringPaketController from '../../controllers/admin/mastering/admin.mastering.paket.controller';

class AdminMasteringPaketRouter extends BaseRoutes {

    public routes(): void {
        this.router.get("/admin/paket", [verifyToken, menuAdminOwner], adminMasteringPaketController.getAll)
        this.router.get("/owner/paket", [verifyToken, menuAdminOwner], adminMasteringPaketController.getAll)

        this.router.get("/admin/paket/:paket_id", [verifyToken, menuAdminOwner], adminMasteringPaketController.Edit)
        this.router.get("/owner/paket/:paket_id", [verifyToken, menuAdminOwner], adminMasteringPaketController.Edit)
        // this.router.post("/auth/me", [verifyToken, menuAdminOwner], AuthController.siswaMe)
    }
}


export default new AdminMasteringPaketRouter().router;