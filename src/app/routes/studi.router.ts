import AuthController from '../controllers/auth.controller';
import authJwt from '../middleware/auth.jwt';
import BaseRoutes from './base.router';

class StudiRouter extends BaseRoutes {

    public routes(): void {
        // AUTH SISWA
        this.router.get("/ujian", [authJwt.verifyToken], AuthController.siswaMe)
        this.router.get("/ujian/:ujian_proses_kelas_id", [authJwt.verifyToken], AuthController.siswaMeUjian)
        this.router.get("/periksa/ujianaktif", [authJwt.verifyToken], AuthController.siswaMeUjian)
        this.router.post("/ujian/:ujian_proses_kelas_id/ujian_daftar", [authJwt.verifyToken], AuthController.siswaMeUjian)
        this.router.get("/ujian/:ujian_proses_kelas_id/periksa_daftar", [authJwt.verifyToken], AuthController.siswaMeUjian)
        this.router.get("/ujian/proses_kelas/:ujian_proses_kelas_id/paketsoal/:ujian_paketsoal_id/kategori_soal", [authJwt.verifyToken], AuthController.siswaMeUjian)
        this.router.get("/ujian/:ujian_paketsoal_id/kategori_soal_detail/:kategori_id", [authJwt.verifyToken], AuthController.siswaMeUjian)
        this.router.post("/dataujian/:ujian_proses_kelas_id/paketsoal/:ujian_paketsoal_kategori_id/mulai_ujian", [authJwt.verifyToken], AuthController.siswaMeUjian)
        this.router.post("/dataujian/:ujian_proses_kelas_id/paketsoal/:ujian_paketsoal_kategori_id/getsoal/:ujian_proses_kelas_siswa_kategori_id", [authJwt.verifyToken], AuthController.siswaMeUjian)
        this.router.post("/dataujian/proses/kategori/:ujian_proses_kelas_siswa_kategori_id/insertjawaban", [authJwt.verifyToken], AuthController.siswaMeUjian)
        this.router.post("/dataujian/proses/finish/:ujian_proses_kelas_siswa_kategori_id", [authJwt.verifyToken], AuthController.siswaMeUjian)
    }
}


export default new StudiRouter().router;