
import { Request, Response } from 'express';
import userController from '../../controllers/user.controller';
import BaseRoutes from '../base.router';
import { fetchToDos } from '../../helpers/babengRedis';
import redisStudiv2PaketsoalController from '../../controllers/admin/studiv2/redis/redis.studiv2.paketsoal.controller';
import { verifyToken, menuAdminOwner } from '../../middleware/auth.jwt';

class RedisStudiv2Routes extends BaseRoutes {

    public routes(): void {
        this.router.get("/home", (req: Request, res: Response) => {
            res.send({
                success: true,
                message: 'this is Redis Home TS dev'
            });
        })


        this.router.get("/paketsoal_aktif/get", [verifyToken, menuAdminOwner], redisStudiv2PaketsoalController.paketsoal_aktif_get)
        this.router.get("/paketsoal_aktif/get/less", [verifyToken, menuAdminOwner], redisStudiv2PaketsoalController.paketsoal_aktif_get_less)
        this.router.delete("/paketsoal_aktif/delete", [verifyToken, menuAdminOwner], redisStudiv2PaketsoalController.paketsoal_aktif_delete)
        this.router.get("/paketsoal/:paketsoal_id/aktifkan", [verifyToken, menuAdminOwner], redisStudiv2PaketsoalController.paketsoal_aktifkan)
        this.router.get("/paketsoal/:paketsoal_id", [verifyToken, menuAdminOwner], redisStudiv2PaketsoalController.paketsoal_store)
        this.router.get("/aspek_detail/:aspek_detail_id", [verifyToken, menuAdminOwner], redisStudiv2PaketsoalController.aspek_detail_store)
        this.router.get("/redis/service", [verifyToken, menuAdminOwner], redisStudiv2PaketsoalController.index)
    }
}


export default new RedisStudiv2Routes().router;