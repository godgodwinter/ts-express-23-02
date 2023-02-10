import { encode_base64 } from '../../helpers/babengGeneral';
import { secret } from '../../config/auth.config';
import { Request, Response } from 'express';
import db from "../../models";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import sekolahService from '../../services/sekolah.service';
const { owner } = db;
class AuthOwnerController {
    ownerLogin = async (req: Request, res: Response): Promise<Response> => {
        try {
            const response = await owner.scope('withPassword').findOne({
                where: {
                    username: req.body.email,
                },
            });

            if (!response) {
                return res.status(404).send({ message: "User Not found." });
            }

            // console.log('tes', req.body.password, user.password);
            const passwordIsValid = bcrypt.compareSync(
                req.body.password,
                response.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    message: "Invalid Password!",
                });
            }

            const expiredTimer = 86400 * 7; // 24 hours
            const token = jwt.sign({ id: response.id, nama: response.nama, role: encode_base64('owner') }, secret, {
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
                id: response.id,
                username: response.username,
                nama: response.nama
            });
        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }


    Me = async (req: Request, res: Response): Promise<Response> => {
        try {
            let identitas = await owner.findOne({
                where: {
                    id: req.app.locals.id,
                },
            });


            const expiredTimer = 86400 * 7; // 24 hours
            const newToken = jwt.sign({ id: req.app.locals.id, nama: req.app.locals.nama, role: encode_base64('owner') }, secret, {
                expiresIn: expiredTimer,
            });

            let sekolah = null;
            let paket = null;
            let stats = null;
            let data = {
                token: req.app.locals.tokenOld,
                newToken
            };

            return res.status(200).send({
                identitas,
                stats,
                data

            });
        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }

}

export default new AuthOwnerController();