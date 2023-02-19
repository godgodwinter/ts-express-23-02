import { verifyToken, menuAdminOwner } from '../../../middleware/auth.jwt';
import BaseRoutes from '../../base.router';
import { validate } from '../../../middleware/validator/studiv2.banksoal.aspek.validator';
import studiv2PaketsoalController from '../../../controllers/admin/studiv2/studiv2.paketsoal.controller';

class AdminUjianstudiPaketsoalRouter extends BaseRoutes {

    public routes(): void {
        // ! PAKETSOAL
        this.router.get("/paketsoal", [verifyToken, menuAdminOwner], studiv2PaketsoalController.paketsoalGetAll)
        this.router.get("/paketsoal/:paketsoal_id", [verifyToken, menuAdminOwner], studiv2PaketsoalController.paketsoalEdit)
        this.router.post("/paketsoal", [verifyToken, menuAdminOwner], studiv2PaketsoalController.paketsoalStore)
        this.router.put("/paketsoal/:paketsoal_id", [verifyToken, menuAdminOwner], studiv2PaketsoalController.paketsoalUpdate)
        this.router.delete("/paketsoal/:paketsoal_id", [verifyToken, menuAdminOwner], studiv2PaketsoalController.paketsoalDelete)
        // ! PAKETSOAL-END

        // ! PAKETSOAL-ASPEK
        this.router.get("/paketsoal/:paketsoal_id/aspek", [verifyToken, menuAdminOwner], studiv2PaketsoalController.aspekGetAll)
        this.router.get("/paketsoal/:paketsoal_id/aspek/:aspek_id", [verifyToken, menuAdminOwner], studiv2PaketsoalController.aspekEdit)
        this.router.post("/paketsoal/:paketsoal_id/aspek", [verifyToken, menuAdminOwner], studiv2PaketsoalController.aspekStore)
        this.router.put("/paketsoal/:paketsoal_id/aspek/:aspek_id", [verifyToken, menuAdminOwner], studiv2PaketsoalController.aspekUpdate)
        this.router.delete("/paketsoal/:paketsoal_id/aspek/:aspek_id", [verifyToken, menuAdminOwner], studiv2PaketsoalController.aspekDelete)
        // ! PAKETSOAL-ASPEK-END

        // ! PAKETSOAL-ASPEK_DETAIL
        // ! PAKETSOAL-ASPEK_DETAIL-END

        // ! PAKETSOAL-ASPEK-PENILAIAN
        // ! PAKETSOAL-ASPEK-PENILAIAN-END

    }
}


export default new AdminUjianstudiPaketsoalRouter().router;