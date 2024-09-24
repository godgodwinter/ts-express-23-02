import { encode_base64 } from '../../helpers/babengGeneral';
import { secret } from '../../config/auth.config';
import { Request, Response } from 'express';
import db from "../../models";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import sekolahService from '../../services/sekolah.service';
const { siswa, admin, gurubk, sekolah } = db;
class AuthSekolahController {

    sekolahLogin = async (req: Request, res: Response): Promise<Response> => {
        try {
            const res_getUser = await gurubk.scope('withPassword').findOne({
                where: {
                    username: req.body.email,
                },
                include: [sekolah]
            });
            // console.log('====================================');
            // console.log(res_getUser);
            // console.log('====================================');

            if (!res_getUser) {
                return res.status(404).send({ message: "User Not found." });
            }

            // console.log('tes', req.body.password, user.password);
            const passwordIsValid = bcrypt.compareSync(
                req.body.password,
                res_getUser.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    message: "Invalid Password!",
                });
            }

            const expiredTimer = 86400 * 7; // 24 hours
            const token = jwt.sign({ id: res_getUser.id, nama: res_getUser.nama, role: encode_base64('sekolah'), sekolah_id: res_getUser.sekolah_id, sekolah_nama: res_getUser.sekolah?.nama }, secret, {
                expiresIn: expiredTimer,
            });

            // req.token = token;
            req.app.locals.token = token;
            // console.log('====================================');
            // console.log(token, req.app.locals.token);
            // console.log('====================================');

            return res.status(200).send({
                token,
                code: 200,
                token_type: "bearer",
                expires_in: expiredTimer,
                id: res_getUser.id,
                username: res_getUser.username,
                nama: res_getUser.nama,
                sekolah_id: res_getUser.sekolah_id,
                sekolah_nama: res_getUser.sekolah?.nama,
                // data: res_getUser
            });
        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }

}

export default new AuthSekolahController();