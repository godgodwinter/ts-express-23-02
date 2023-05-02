import { verifyToken, menuSiswa } from '../../middleware/auth.jwt';
import BaseRoutes from '../base.router';
import siswaUjianstudiv3Controller from '../../controllers/siswa/ujianstudi/siswa.ujianstudiv3.controller';

class siswaUjianstudiv3Router extends BaseRoutes {

    public routes(): void {
        this.router.get("/periksaUjianAktif", [verifyToken, menuSiswa], siswaUjianstudiv3Controller.periksaUjianAktif) // !belum
        this.router.get("/get_aspekdetail_tersedia", [verifyToken, menuSiswa], siswaUjianstudiv3Controller.get_aspekdetail_tersedia)
        this.router.get("/aspekdetail/:studi_v2_proses_aspek_detail_id/detail", [verifyToken, menuSiswa], siswaUjianstudiv3Controller.getAspekDetail_detail)
        this.router.post("/paketsoal/:studi_v2_proses_aspek_detail_id/do_mulai", [verifyToken, menuSiswa], siswaUjianstudiv3Controller.v3_doMulai) //! sudah
        this.router.get("/paketsoal/:studi_v2_proses_aspek_detail_id/getsoal", [verifyToken, menuSiswa], siswaUjianstudiv3Controller.getSoal_perAspekdetail) //getsoal per aspekdetail
        this.router.get("/paketsoal/:studi_v2_proses_aspek_detail_id/getsoal/:studi_v2_proses_aspek_detail_soal_id", [verifyToken, menuSiswa], siswaUjianstudiv3Controller.getSoal_perSoal) //get soal per soal
        this.router.post("/paketsoal/:studi_v2_proses_aspek_detail_id/getsoal/:studi_v2_proses_aspek_detail_soal_id", [verifyToken, menuSiswa], siswaUjianstudiv3Controller.v3_doJawab) //jawab
        this.router.post("/paketsoal/:studi_v2_proses_aspek_detail_id/do_finish", [verifyToken, menuSiswa], siswaUjianstudiv3Controller.v3_doJawab)
    }
}


export default new siswaUjianstudiv3Router().router;