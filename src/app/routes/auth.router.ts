
import { Request, Response } from 'express';
import AuthController from '../controllers/auth.controller';
import authJwt from '../middleware/auth.jwt';
import BaseRoutes from './base.router';

class AuthRoutes extends BaseRoutes {

    public routes(): void {
        // AUTH SISWA
        this.router.post("/siswa/auth/login", AuthController.siswaLogin)
        this.router.post("/siswa/auth/me", [authJwt.verifyToken], AuthController.siswaMe)
        this.router.post("/siswa/auth/me_ujian", [authJwt.verifyToken], AuthController.siswaMeUjian)
    }
}


export default new AuthRoutes().router;