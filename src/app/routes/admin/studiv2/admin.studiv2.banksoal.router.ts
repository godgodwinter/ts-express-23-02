import { verifyToken, menuAdminOwner } from '../../../middleware/auth.jwt';
import BaseRoutes from '../../base.router';
import studiv2BanksoalController from '../../../controllers/admin/studiv2/studiv2.banksoal.controller';
import { validate } from '../../../middleware/validator/studiv2.banksoal.aspek.validator';

class AdminUjianstudiBanksoalRouter extends BaseRoutes {

    public routes(): void {
        this.router.get("/banksoal/aspek", [verifyToken, menuAdminOwner], studiv2BanksoalController.aspekGetAll)
        this.router.get("/banksoal/aspek/:aspek_id", [verifyToken, menuAdminOwner], studiv2BanksoalController.aspekEdit)
        this.router.post("/banksoal/aspek", [verifyToken, menuAdminOwner], studiv2BanksoalController.aspekStore)
        this.router.put("/banksoal/aspek/:aspek_id", [verifyToken, menuAdminOwner], validate, studiv2BanksoalController.aspekUpdate)
        this.router.delete("/banksoal/aspek/:aspek_id", [verifyToken, menuAdminOwner], studiv2BanksoalController.aspekDelete)

        this.router.get("/banksoal/aspek_detail", [verifyToken, menuAdminOwner], studiv2BanksoalController.aspek_detailGetAll)
        this.router.get("/banksoal/aspek_detail/:aspek_detail_id", [verifyToken, menuAdminOwner], studiv2BanksoalController.aspek_detailEdit)
        this.router.post("/banksoal/aspek_detail", [verifyToken, menuAdminOwner], studiv2BanksoalController.aspek_detailStore)
        this.router.put("/banksoal/aspek_detail/:aspek_detail_id", [verifyToken, menuAdminOwner], validate, studiv2BanksoalController.aspek_detailUpdate)
        this.router.delete("/banksoal/aspek_detail/:aspek_detail_id", [verifyToken, menuAdminOwner], studiv2BanksoalController.aspek_detailDelete)


        this.router.get("/banksoal/aspek_detail/:aspek_detail_id/soal", [verifyToken, menuAdminOwner], studiv2BanksoalController.soalGetAll)
        this.router.get("/banksoal/aspek_detail/:aspek_detail_id/soal/:soal_id", [verifyToken, menuAdminOwner], studiv2BanksoalController.soalEdit)
        this.router.post("/banksoal/aspek_detail/:aspek_detail_id/soal", [verifyToken, menuAdminOwner], studiv2BanksoalController.soalStore)
        this.router.put("/banksoal/aspek_detail/:aspek_detail_id/soal/:soal_id", [verifyToken, menuAdminOwner], studiv2BanksoalController.soalUpdate)
        this.router.delete("/banksoal/aspek_detail/:aspek_detail_id/soal/:soal_id", [verifyToken, menuAdminOwner], studiv2BanksoalController.soalDelete)

        // !import
        this.router.get("/banksoal/aspek_detail/:aspek_detail_id/import/periksa/:kode_soal", [verifyToken, menuAdminOwner], studiv2BanksoalController.importSoalPeriksa)

    }
}


export default new AdminUjianstudiBanksoalRouter().router;