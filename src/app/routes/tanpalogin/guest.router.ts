import { verifyToken, menuAdminOwner } from '../../middleware/auth.jwt';
import BaseRoutes from '../base.router';
import adminMasteringKatabijakController from '../../controllers/admin/mastering/admin.mastering.katabijak.controller';

class guestRouter extends BaseRoutes {

    public routes(): void {
        this.router.get("/guest/katabijak", adminMasteringKatabijakController.getRandom)
        // this.router.post("/auth/me", [verifyToken, menuAdminOwner], AuthController.siswaMe)
    }
}


export default new guestRouter().router;