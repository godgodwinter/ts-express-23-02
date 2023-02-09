import { encode_base64 } from './../helpers/babengGeneral';
import { secret } from './../config/auth.config';
import { Request, Response } from 'express';
import db from "../models";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import sekolahService from '../services/sekolah.service';
const { siswa, admin } = db;
class AuthController {
    adminLogin = async (req: Request, res: Response): Promise<Response> => {
        try {
            const response = await admin.scope('withPassword').findOne({
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
            const token = jwt.sign({ id: response.id, nama: response.name, role: encode_base64('admin') }, secret, {
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

    siswaLogin = async (req: Request, res: Response): Promise<Response> => {
        try {
            const resSiswa = await siswa.scope('withPassword').findOne({
                where: {
                    username: req.body.email,
                },
            });

            if (!resSiswa) {
                return res.status(404).send({ message: "User Not found." });
            }

            // console.log('tes', req.body.password, user.password);
            const passwordIsValid = bcrypt.compareSync(
                req.body.password,
                resSiswa.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    message: "Invalid Password!",
                });
            }

            const expiredTimer = 86400 * 7; // 24 hours
            const token = jwt.sign({ id: resSiswa.id, nama: resSiswa.nama, role: encode_base64('siswa') }, secret, {
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
                id: resSiswa.id,
                username: resSiswa.username,
                nama: resSiswa.nama
            });
        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }


    siswaMe = async (req: Request, res: Response): Promise<Response> => {
        try {
            let identitas = await siswa.findOne({
                where: {
                    id: req.app.locals.siswaId,
                },
            });


            const expiredTimer = 86400 * 7; // 24 hours
            const newToken = jwt.sign({ id: req.app.locals.siswaId }, secret, {
                expiresIn: expiredTimer,
            });

            let sekolah = null;
            let paket = null;
            let stats = null;
            let data = {
                token: null,
                newToken
            };

            return res.status(200).send({
                identitas,
                sekolah,
                paket,
                stats,
                data

            });
        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }


    siswaMeUjian = async (req: Request, res: Response): Promise<Response> => {
        try {
            let me = await siswa.findOne({
                where: {
                    id: req.app.locals.siswaId,
                },
                include: [db.kelas, db.sekolah]
            });

            const expiredTimer = 86400 * 7; // 24 hours
            const newToken = jwt.sign({ id: req.app.locals.siswaId }, secret, {
                expiresIn: expiredTimer,
            });
            let sekolah = me?.sekolah;
            let kelas = me?.kelas;
            let stats = null;
            let data = {
                token: null,
                newToken
            };
            let profile = me
            // delete profile.kelas;
            // delete profile.sekolah;
            // console.log(profile);

            const service: sekolahService = new sekolahService(req);
            const paket = await service.getPaket(sekolah?.paket_id);
            // console.log('====================================');
            // console.log(paket);
            // console.log('====================================');
            let identitas = {
                sekolah,
                kelas,
                profile,
                paket,
            }


            let kelas_id = me?.kelas_id;
            let ujian: [] = [];

            return res.status(200).send({
                identitas,
                kelas_id,
                ujian

            });
        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }
}

export default new AuthController();