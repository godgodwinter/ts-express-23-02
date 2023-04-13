
import { Request, Response } from 'express';
import userController from '../../controllers/user.controller';
import BaseRoutes from '../base.router';
import { fetchToDos } from '../../helpers/babengRedis';
import redisStudiv2PaketsoalController from '../../controllers/admin/studiv2/redis/redis.studiv2.paketsoal.controller';
import redisStudiv2ProsesController from '../../controllers/admin/studiv2/redis/redis.studiv2.proses.controller';
import { verifyToken, menuAdminOwner } from '../../middleware/auth.jwt';

class RedisStudiv2Routes extends BaseRoutes {

    public routes(): void {
        this.router.get("/home", (req: Request, res: Response) => {
            res.send({
                success: true,
                message: 'this is Redis Home TS dev'
            });
        })

        // ! PAKETSOAL
        this.router.get("/paketsoal_aktif/get", [verifyToken, menuAdminOwner], redisStudiv2PaketsoalController.paketsoal_aktif_get)
        this.router.get("/paketsoal_aktif/get/less", [verifyToken, menuAdminOwner], redisStudiv2PaketsoalController.paketsoal_aktif_get_less)
        this.router.delete("/paketsoal_aktif/delete", [verifyToken, menuAdminOwner], redisStudiv2PaketsoalController.paketsoal_aktif_delete)
        this.router.get("/paketsoal/:paketsoal_id/aktifkan", [verifyToken, menuAdminOwner], redisStudiv2PaketsoalController.paketsoal_aktifkan)
        this.router.get("/paketsoal/:paketsoal_id", [verifyToken, menuAdminOwner], redisStudiv2PaketsoalController.paketsoal_store)
        this.router.get("/aspek_detail/:aspek_detail_id", [verifyToken, menuAdminOwner], redisStudiv2PaketsoalController.aspek_detail_store)
        this.router.get("/redis/service", [verifyToken, menuAdminOwner], redisStudiv2PaketsoalController.index)


        // ! PROSES
        this.router.get("/proses/:siswa_id/get", [verifyToken, menuAdminOwner], redisStudiv2ProsesController.proses_siswa_get)
        this.router.get("/proses/:siswa_id/store", [verifyToken, menuAdminOwner], redisStudiv2ProsesController.proses_siswa_store)
        this.router.delete("/proses/:siswa_id/delete", [verifyToken, menuAdminOwner], redisStudiv2ProsesController.proses_siswa_delete)


        // ! PROSES
        this.router.get("/proses_kelas/:kelas_id/store", [verifyToken, menuAdminOwner], redisStudiv2ProsesController.proses_kelas_store)
        this.router.delete("/proses_kelas/:kelas_id/delete", [verifyToken, menuAdminOwner], redisStudiv2ProsesController.proses_kelas_delete)
    }
}


export default new RedisStudiv2Routes().router;