import { verifyToken, menuAdminOwner } from '../../../middleware/auth.jwt';
import BaseRoutes from '../../base.router';
import { validate } from '../../../middleware/validator/studiv2.banksoal.aspek.validator';
import Studiv2HasilController from '../../../controllers/admin/studiv2/studiv2.hasil.controller';

class AdminUjianstudiHasilRouter extends BaseRoutes {

    public routes(): void {
        // * HASIL
        // ! PERSISWA
        this.router.get("/hasil/sekolah/:sekolah_id/kelas/:kelas_id/siswa/:siswa_id", [verifyToken, menuAdminOwner], Studiv2HasilController.hasilGetSiswa)
        this.router.post("/hasil/sekolah/:sekolah_id/kelas/:kelas_id/siswa/:siswa_id/generate", [verifyToken, menuAdminOwner], Studiv2HasilController.hasilGeneratePersiswa)
        this.router.delete("/hasil/sekolah/:sekolah_id/kelas/:kelas_id/siswa/:siswa_id/delete", [verifyToken, menuAdminOwner], Studiv2HasilController.hasilDeletePersiswa)
        //# revisi
        this.router.put("/hasil/revisi/hasil_aspek_detail_id/:hasil_aspek_detail_id", [verifyToken, menuAdminOwner], Studiv2HasilController.hasilRevisiNilaiAkhir)
        // ! PERSISWA-END


        // ! PERKELAS
        this.router.get("/hasil/sekolah/:sekolah_id/kelas/:kelas_id", [verifyToken, menuAdminOwner], Studiv2HasilController.hasilGetPerkelas)
        this.router.post("/hasil/sekolah/:sekolah_id/kelas/:kelas_id/generate", [verifyToken, menuAdminOwner], Studiv2HasilController.hasilGeneratePerkelas)
        this.router.delete("/hasil/sekolah/:sekolah_id/kelas/:kelas_id/delete", [verifyToken, menuAdminOwner], Studiv2HasilController.hasilDeletePerkelas)
        // ! PERKELAS-END

        // * HASIL-END

    }
}


export default new AdminUjianstudiHasilRouter().router;