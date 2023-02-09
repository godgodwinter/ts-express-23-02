
import { Request, Response } from 'express';
import userController from '../controllers/user.controller';
import BaseRoutes from './base.router';

class HomeRoutes extends BaseRoutes {

    public routes(): void {
        this.router.get("/home", (req: Request, res: Response) => {
            res.send({
                success: true,
                message: 'this is Home TS dev'
            });
        })


        this.router.get("/users", userController.index)
    }
}


export default new HomeRoutes().router;