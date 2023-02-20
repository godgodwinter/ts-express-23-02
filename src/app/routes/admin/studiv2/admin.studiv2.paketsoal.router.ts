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


        // ! PAKETSOAL-ASPEK-PENILAIAN
        this.router.get("/paketsoal/:paketsoal_id/aspek/penilaian/get", [verifyToken, menuAdminOwner], studiv2PaketsoalController.penilaianGet)
        this.router.post("/paketsoal/:paketsoal_id/aspek/penilaian/get", [verifyToken, menuAdminOwner], studiv2PaketsoalController.penilaianStore)
        this.router.get("/paketsoal/:paketsoal_id/aspek/penilaian/get/:aspek_id", [verifyToken, menuAdminOwner], studiv2PaketsoalController.penilaianGetPerAspek)
        this.router.delete("/paketsoal/:paketsoal_id/aspek/penilaian/get/:penilaian_id", [verifyToken, menuAdminOwner], studiv2PaketsoalController.penilaianDelete)
        // ! PAKETSOAL-ASPEK-PENILAIAN-END



        // ! PAKETSOAL-ASPEK_DETAIL
        this.router.get("/paketsoal/:paketsoal_id/aspek_detail", [verifyToken, menuAdminOwner], studiv2PaketsoalController.aspek_detailGetAll)
        this.router.get("/paketsoal/:paketsoal_id/aspek_detail/:aspek_detail_id", [verifyToken, menuAdminOwner], studiv2PaketsoalController.aspek_detailEdit)
        this.router.post("/paketsoal/:paketsoal_id/aspek_detail", [verifyToken, menuAdminOwner], studiv2PaketsoalController.aspek_detailStore)
        this.router.put("/paketsoal/:paketsoal_id/aspek_detail/:aspek_detail_id", [verifyToken, menuAdminOwner], studiv2PaketsoalController.aspek_detailUpdate)
        this.router.delete("/paketsoal/:paketsoal_id/aspek_detail/:aspek_detail_id", [verifyToken, menuAdminOwner], studiv2PaketsoalController.aspek_detailDelete)
        // ! PAKETSOAL-ASPEK_DETAIL-END


        // ! PAKETSOAL-ASPEK_DETAIL-SOAL
        this.router.get("/paketsoal/:paketsoal_id/aspek_detail/:aspek_detail_id/soal", [verifyToken, menuAdminOwner], studiv2PaketsoalController.soalGetAll)
        this.router.post("/paketsoal/:paketsoal_id/aspek_detail/:aspek_detail_id/soal", [verifyToken, menuAdminOwner], studiv2PaketsoalController.soalStore)
        this.router.delete("/paketsoal/:paketsoal_id/aspek_detail/:aspek_detail_id/soal/:soal_id", [verifyToken, menuAdminOwner], studiv2PaketsoalController.soalDelete)
        // ! PAKETSOAL-ASPEK_DETAIL-SOAL-END


    }
}


export default new AdminUjianstudiPaketsoalRouter().router;