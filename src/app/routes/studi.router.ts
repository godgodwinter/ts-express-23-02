import AuthController from '../controllers/auth/auth.controller';
import studiController from '../controllers/studi.controller';
import { menuSiswa, verifyToken } from '../middleware/auth.jwt';
import BaseRoutes from './base.router';

class StudiRouter extends BaseRoutes {

    public routes(): void {
        // AUTH SISWA
        this.router.get("/ujian", [verifyToken, menuSiswa], studiController.getDataUjian)
        this.router.get("/ujian/:ujian_proses_kelas_id", [verifyToken, menuSiswa], studiController.getDataUjianEdit)
        this.router.get("/periksa/ujianaktif", [verifyToken, menuSiswa], studiController.periksaUjianAktif)
        this.router.post("/ujian/:ujian_proses_kelas_id/ujian_daftar", [verifyToken, menuSiswa], studiController.doUjianDaftar)
        this.router.get("/ujian/:ujian_proses_kelas_id/periksa_daftar", [verifyToken, menuSiswa], studiController.periksa_daftar)
        this.router.get("/ujian/proses_kelas/:ujian_proses_kelas_id/paketsoal/:ujian_paketsoal_id/kategori_soal", [verifyToken, menuSiswa], studiController.getKategoriSoal)
        this.router.get("/ujian/:ujian_paketsoal_id/kategori_soal_detail/:kategori_id", [verifyToken, menuSiswa], studiController.getKategoriSoalDetail)
        this.router.post("/dataujian/:ujian_proses_kelas_id/paketsoal/:ujian_paketsoal_kategori_id/mulai_ujian", [verifyToken, menuSiswa], studiController.doMulaiUjian)
        this.router.post("/dataujian/:ujian_proses_kelas_id/paketsoal/:ujian_paketsoal_kategori_id/getsoal/:ujian_proses_kelas_siswa_kategori_id", [verifyToken, menuSiswa], studiController.getSoal)
        this.router.post("/dataujian/proses/kategori/:ujian_proses_kelas_siswa_kategori_id/insertjawaban", [verifyToken, menuSiswa], studiController.doInsertJawaban)
        this.router.post("/dataujian/proses/finish/:ujian_proses_kelas_siswa_kategori_id", [verifyToken, menuSiswa], studiController.doFinish)
    }
}


export default new StudiRouter().router;