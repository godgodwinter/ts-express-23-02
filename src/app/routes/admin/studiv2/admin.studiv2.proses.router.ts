import { verifyToken, menuAdminOwner } from '../../../middleware/auth.jwt';
import BaseRoutes from '../../base.router';
import { validate } from '../../../middleware/validator/studiv2.banksoal.aspek.validator';
import studiv2ProsesController from '../../../controllers/admin/studiv2/studiv2.proses.controller';

class AdminUjianstudiProsesRouter extends BaseRoutes {

    public routes(): void {

        // ! PERSISWA
        this.router.get("/proses/sekolah/:sekolah_id/kelas/:kelas_id/siswa/:siswa_id", [verifyToken, menuAdminOwner], studiv2ProsesController.prosesGetSiswa)
        this.router.post("/proses/sekolah/:sekolah_id/kelas/:kelas_id/siswa/:siswa_id/generate/:paketsoal_id", [verifyToken, menuAdminOwner], studiv2ProsesController.prosesStorePerSiswa)
        this.router.delete("/proses/sekolah/:sekolah_id/kelas/:kelas_id/siswa/:siswa_id/delete/:proses_id", [verifyToken, menuAdminOwner], studiv2ProsesController.prosesDeletePersiswa)
        this.router.post("/proses/reset/:proses_detail_id/waktu", [verifyToken, menuAdminOwner], studiv2ProsesController.do_reset_waktu)
        this.router.post("/proses/reset/:proses_detail_id/salah", [verifyToken, menuAdminOwner], studiv2ProsesController.do_reset_salah)
        // ! PERSISWA-END


        // ! PERKELAS
        this.router.get("/proses/sekolah/:sekolah_id/kelas/:kelas_id", [verifyToken, menuAdminOwner], studiv2ProsesController.prosesGetSiswaPerKelas)
        this.router.post("/proses/sekolah/:sekolah_id/kelas/:kelas_id/generate/:paketsoal_id", [verifyToken, menuAdminOwner], studiv2ProsesController.prosesStoreSiswaPerKelas)
        this.router.delete("/proses/sekolah/:sekolah_id/kelas/:kelas_id/delete", [verifyToken, menuAdminOwner], studiv2ProsesController.prosesDeleteSiswaPerKelas)
        // ! PERKELAS-END


    }
}


export default new AdminUjianstudiProsesRouter().router;