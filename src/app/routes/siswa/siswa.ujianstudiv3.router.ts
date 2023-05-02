import { verifyToken, menuSiswa } from '../../middleware/auth.jwt';
import BaseRoutes from '../base.router';
import siswaUjianstudiv3Controller from '../../controllers/siswa/ujianstudi/siswa.ujianstudiv3.controller';

class siswaUjianstudiv3Router extends BaseRoutes {

    public routes(): void {
        this.router.get("/periksaUjianAktif", [verifyToken, menuSiswa], siswaUjianstudiv3Controller.getAspekDetail)
        this.router.post("/paketsoal/:studi_v2_proses_aspek_detail_id/do_mulai", [verifyToken, menuSiswa], siswaUjianstudiv3Controller.getAspekDetail)
        this.router.get("/soal_id/:studi_v2_proses_aspek_detail_soal_id", [verifyToken, menuSiswa], siswaUjianstudiv3Controller.getAspekDetail) //jawab
        this.router.post("/soal_id/:studi_v2_proses_aspek_detail_soal_id", [verifyToken, menuSiswa], siswaUjianstudiv3Controller.getAspekDetail) //jawab
        this.router.get("/paketsoal/:studi_v2_proses_aspek_detail_id", [verifyToken, menuSiswa], siswaUjianstudiv3Controller.getAspekDetail)
        this.router.post("/paketsoal/:studi_v2_proses_aspek_detail_id/do_finish", [verifyToken, menuSiswa], siswaUjianstudiv3Controller.getAspekDetail)
    }
}


export default new siswaUjianstudiv3Router().router;