import { verifyToken, menuAdminOwner } from '../../../middleware/auth.jwt';
import BaseRoutes from '../../base.router';
import AdminStudiProsesController from '../../../controllers/admin/ujian_studi/studi.proses.controller';

class StudiProsesRouter extends BaseRoutes {

    public routes(): void {
        this.router.get("/admin/menuujian/proses", [verifyToken, menuAdminOwner], AdminStudiProsesController.getAllSekolah)
        this.router.get("/admin/menuujian/proseskelas/:ujian_proses_id/kelas", [verifyToken, menuAdminOwner], AdminStudiProsesController.getAllKelasPerSekolah)
        this.router.get("/admin/menuujian/proseskelas/:ujian_proses_id/kelas/:ujian_proses_kelas_id", [verifyToken, menuAdminOwner], AdminStudiProsesController.getAllSiswaPerKelas)
        this.router.get("/admin/menuujian/proseskelas/:ujian_proses_id/kelas/:ujian_proses_kelas_id/siswa/:ujian_proses_kelas_siswa_id", [verifyToken, menuAdminOwner], AdminStudiProsesController.getAllKategoriPerSiswa)

        this.router.post("/admin/menuujian/proesssiswa/:ujian_proses_kelas_siswa_kategori_id/reset_waktu", [verifyToken, menuAdminOwner], AdminStudiProsesController.doResetWaktu)
        this.router.post("/admin/menuujian/proesssiswa/:ujian_proses_kelas_siswa_kategori_id/reset_salah", [verifyToken, menuAdminOwner], AdminStudiProsesController.doResetSalah)
        // this.router.post("/admin/menuujian/proesssiswa/:ujian_proses_kelas_siswa_kategori_id/reset_all", [verifyToken, menuAdminOwner], AdminStudiProsesController.doResetAll) // !BELUM

        // GENERATE HASIL UJIAN STUDI
        // this.router.get("/admin/hasil_ujian_lintas/kelas/:kelas_id", [verifyToken, menuAdminOwner], AdminStudiProsesController.doGenerateHasilUjianKelas)
        // this.router.get("/admin/hasil_ujian_lintas/siswa/:siswa_id", [verifyToken, menuAdminOwner], AdminStudiProsesController.doGenerateHasilUjianSiswa)



    }
}


export default new StudiProsesRouter().router;