import { verifyToken, menuAdminOwner } from '../../../middleware/auth.jwt';
import BaseRoutes from '../../base.router';
import { validate } from '../../../middleware/validator/studiv2.banksoal.aspek.validator';
import studiv2PaketsoalController from '../../../controllers/admin/studiv2/studiv2.paketsoal.controller';

class AdminUjianstudiPaketsoalRouter extends BaseRoutes {

    public routes(): void {
        this.router.get("/paketsoal", [verifyToken, menuAdminOwner], studiv2PaketsoalController.aspekGetAll)

    }
}


export default new AdminUjianstudiPaketsoalRouter().router;