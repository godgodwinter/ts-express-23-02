
import { Request, Response } from 'express';
import userController from '../controllers/user.controller';
import BaseRoutes from './base.router';
import { fetchToDos } from '../helpers/babengRedis';
import redisStudiv2PaketsoalController from '../controllers/admin/studiv2/redis/redis.studiv2.paketsoal.controller';

// import { babengLimiter } from '../helpers/babengLimiter';
// import rateLimit from "express-rate-limit"
// const limiter = rateLimit({
//     windowMs: 1 * 60 * 1000, // 1 minutes
//     max: 1, // Limit each IP to 70 requests per `window` (here, per 15 minutes)
//     // delayMs: 0, // disable delaying - full speed until the max limit is reached
//     message: "Too many requests maid from this IP, please try again after an hour",
//     standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
//     legacyHeaders: false, // Disable the `X-RateLimit-*` headers
// })
class HomeRoutes extends BaseRoutes {

    public routes(): void {
        this.router.get("/home", (req: Request, res: Response) => {
            res.send({
                success: true,
                message: 'this is Home TS dev'
            });
        })


        this.router.get("/users", userController.index)


        this.router.get("/redis", async (req: Request, res: Response) => {
            res.send(await fetchToDos(req.query.completed));
        })
        this.router.get("/redis/service", redisStudiv2PaketsoalController.index)
    }
}


export default new HomeRoutes().router;