import { verifyToken, menuAdminOwner } from '../../../middleware/auth.jwt';
import BaseRoutes from '../../base.router';
import { validate } from '../../../middleware/validator/studiv2.banksoal.aspek.validator';
import studiv2PaketsoalController from '../../../controllers/admin/studiv2/studiv2.paketsoal.controller';

class AdminUjianstudiProsesRouter extends BaseRoutes {

    public routes(): void {
        // ! PERKELAS
        this.router.get("/proses/sekolah/:sekolah_id/kelas/:kelas_id", [verifyToken, menuAdminOwner], studiv2PaketsoalController.paketsoalGetAll)
        this.router.post("/proses/sekolah/:sekolah_id/kelas/:kelas_id/generate/:paketsoal_id", [verifyToken, menuAdminOwner], studiv2PaketsoalController.paketsoalGetAll)
        this.router.delete("/proses/sekolah/:sekolah_id/kelas/:kelas_id/delete/:proses_id", [verifyToken, menuAdminOwner], studiv2PaketsoalController.paketsoalGetAll)
        // ! PERKELAS-END

        // ! PERSISWA
        this.router.get("/proses/sekolah/:sekolah_id/kelas/:kelas_id/siswa/:siswa_id", [verifyToken, menuAdminOwner], studiv2PaketsoalController.paketsoalGetAll)
        this.router.post("/proses/sekolah/:sekolah_id/kelas/:kelas_id/siswa/:siswa_id/generate/:paketsoal_id", [verifyToken, menuAdminOwner], studiv2PaketsoalController.paketsoalGetAll)
        this.router.delete("/proses/sekolah/:sekolah_id/kelas/:kelas_id/siswa/:siswa_id/delete/:proses_id", [verifyToken, menuAdminOwner], studiv2PaketsoalController.paketsoalGetAll)
        // ! PERSISWA-END


    }
}


export default new AdminUjianstudiProsesRouter().router;