import { verifyToken, menuAdminOwner } from '../../../middleware/auth.jwt';
import BaseRoutes from '../../base.router';
import studiv2BanksoalController from '../../../controllers/admin/studiv2/studiv2.banksoal.controller';
import { validate } from '../../../middleware/validator/studiv2.banksoal.aspek.validator';

class AdminUjianstudiBanksoalRouter extends BaseRoutes {

    public routes(): void {
        this.router.get("/banksoal/aspek", [verifyToken, menuAdminOwner], studiv2BanksoalController.aspekGetAll)
        this.router.get("/banksoal/aspek/:aspek_id", [verifyToken, menuAdminOwner], studiv2BanksoalController.aspekEdit)
        this.router.post("/banksoal/aspek", [verifyToken, menuAdminOwner], studiv2BanksoalController.aspekStore)
        this.router.put("/banksoal/aspek/:aspek_id", [verifyToken, menuAdminOwner],validate, studiv2BanksoalController.aspekUpdate)
    }
}


export default new AdminUjianstudiBanksoalRouter().router;