import AuthController from '../controllers/auth.controller';
import studiController from '../controllers/studi.controller';
import authJwt from '../middleware/auth.jwt';
import BaseRoutes from './base.router';

class StudiRouter extends BaseRoutes {

    public routes(): void {
        // AUTH SISWA
        this.router.get("/ujian", [authJwt.verifyToken], studiController.getDataUjian)
        this.router.get("/ujian/:ujian_proses_kelas_id", [authJwt.verifyToken], studiController.getDataUjianEdit)
        this.router.get("/periksa/ujianaktif", [authJwt.verifyToken], studiController.getDataUjian)
        this.router.post("/ujian/:ujian_proses_kelas_id/ujian_daftar", [authJwt.verifyToken], studiController.doUjianDaftar)
        this.router.get("/ujian/:ujian_proses_kelas_id/periksa_daftar", [authJwt.verifyToken], studiController.periksa_daftar)
        this.router.get("/ujian/proses_kelas/:ujian_proses_kelas_id/paketsoal/:ujian_paketsoal_id/kategori_soal", [authJwt.verifyToken], studiController.getDataUjian)
        this.router.get("/ujian/:ujian_paketsoal_id/kategori_soal_detail/:kategori_id", [authJwt.verifyToken], studiController.getDataUjian)
        this.router.post("/dataujian/:ujian_proses_kelas_id/paketsoal/:ujian_paketsoal_kategori_id/mulai_ujian", [authJwt.verifyToken], studiController.getDataUjian)
        this.router.post("/dataujian/:ujian_proses_kelas_id/paketsoal/:ujian_paketsoal_kategori_id/getsoal/:ujian_proses_kelas_siswa_kategori_id", [authJwt.verifyToken], studiController.getDataUjian)
        this.router.post("/dataujian/proses/kategori/:ujian_proses_kelas_siswa_kategori_id/insertjawaban", [authJwt.verifyToken], studiController.getDataUjian)
        this.router.post("/dataujian/proses/finish/:ujian_proses_kelas_siswa_kategori_id", [authJwt.verifyToken], studiController.getDataUjian)
    }
}


export default new StudiRouter().router;