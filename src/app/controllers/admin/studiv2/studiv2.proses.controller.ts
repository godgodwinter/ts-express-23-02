import { Request, Response } from 'express';
import studiv2ProsesService from '../../../services/studiv2/admin.studiv2.proses.service';
import { db_studi_v2 } from "../../../models";

const { studi_v2_paketsoal, studi_v2_paketsoal_aspek, studi_v2_paketsoal_aspek_detail, studi_v2_paketsoal_aspek_penilaian, studi_v2_paketsoal_soal,
    studi_v2_paketsoal_pilihanjawaban,
    studi_v2_banksoal_soal, studi_v2_banksoal_soal_pilihanjawaban,
    studi_v2_proses, studi_v2_proses_aspek_detail, studi_v2_proses_aspek_detail_soal, studi_v2_proses_aspek_detail_soal_pilihan_jawaban,
    studi_v2_hasil
} = db_studi_v2;
class Studiv2ProsesController {
    // ! PERSISWA
    prosesGetSiswa = async (req: Request, res: Response): Promise<Response | undefined> => {
        try {
            const proses_Service: studiv2ProsesService = new studiv2ProsesService(req);
            const siswa = await proses_Service.prosesGetSiswa(parseInt(req.params.siswa_id));
            const datas = await proses_Service.prosesGetProsesUjianPersiswa(parseInt(req.params.siswa_id));

            return res.send({
                siswa: siswa,
                data: datas,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }
    do_reset_waktu = async (req: Request, res: Response): Promise<Response | undefined> => {
        try {
            const proses_Service: studiv2ProsesService = new studiv2ProsesService(req);
            const datas = await proses_Service.do_reset_waktu(parseInt(req.params.proses_detail_id), parseInt(req.body.siswa_id));

            return res.send({
                data: datas,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }
    do_reset_salah = async (req: Request, res: Response): Promise<Response | undefined> => {
        try {
            const proses_Service: studiv2ProsesService = new studiv2ProsesService(req);
            const datas = await proses_Service.do_reset_salah(parseInt(req.params.proses_detail_id), parseInt(req.body.siswa_id));

            return res.send({
                data: datas,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }
    prosesStorePerSiswa = async (req: Request, res: Response): Promise<Response | undefined> => {
        try {
            const proses_Service: studiv2ProsesService = new studiv2ProsesService(req);
            // periksa jika siswa_id di table proses sudah ada maka skip /return false
            const isSiswaSudahAdaDiProses = await proses_Service.prosesPeriksaIsSiswaSudahAda(parseInt(req.params.siswa_id), req.body.tgl_ujian);
            // console.log(isSiswaSudahAdaDiProses);

            // return res.send({
            //     data: isSiswaSudahAdaDiProses,
            //     message: "Success"
            // });
            if (isSiswaSudahAdaDiProses) {

                // const addSoal = await proses_Service.prosesAddSoal(parseInt(req.params.siswa_id), parseInt(req.params.paketsoal_id), req.body);

                return res.status(200).send({
                    status: false,
                    data: "Data ujian Siswa sudah ada",
                    message: "Failed"
                });
            }
            const datas = await proses_Service.prosesStorePerSiswa_with_redis(parseInt(req.params.siswa_id), parseInt(req.params.paketsoal_id), req.body);
            // const addSoal = await proses_Service.prosesAddSoal(parseInt(req.params.siswa_id), parseInt(req.params.paketsoal_id), req.body);
            // const fn_delay_response = (arg: any) => {
            //     console.log(`arg was => ${arg}`);
            //     // return res.status(500).send({ message: "error.message" });
            //     return res.send({
            //         data: "datas",
            //         message: "Success"
            //     });
            // }
            // setTimeout(fn_delay_response, 3000, 'argumen example');
            return res.send({
                data: datas,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }
    prosesDeletePersiswa = async (req: Request, res: Response): Promise<Response | undefined> => {
        try {
            const proses_Service: studiv2ProsesService = new studiv2ProsesService(req);
            const datas = await proses_Service.prosesDeletePersiswa(parseInt(req.params.siswa_id), parseInt(req.params.proses_id));
            // setTimeout(()=>{},5000)


            return res.send({
                data: datas,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }


    // ! PERSISWA-END

    //! PERKELAS
    prosesGetSiswaPerKelas = async (req: Request, res: Response): Promise<Response | undefined> => {
        try {
            const proses_Service: studiv2ProsesService = new studiv2ProsesService(req);
            const datas = await proses_Service.prosesGetSiswaPerKelas(parseInt(req.params.kelas_id));
            // setTimeout(()=>{},5000)


            return res.send({
                data: datas,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }
    prosesStoreSiswaPerKelas = async (req: Request, res: Response): Promise<Response | undefined> => {
        try {
            const proses_Service: studiv2ProsesService = new studiv2ProsesService(req);
            const datas = await proses_Service.prosesStoreSiswaPerKelas(parseInt(req.params.kelas_id), parseInt(req.params.paketsoal_id), req.body);
            // setTimeout(()=>{},5000)


            return res.send({
                data: datas,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }
    prosesDeleteSiswaPerKelas = async (req: Request, res: Response): Promise<Response | undefined> => {
        try {
            const proses_Service: studiv2ProsesService = new studiv2ProsesService(req);
            const datas = await proses_Service.prosesDeleteSiswaPerKelas(parseInt(req.params.kelas_id));
            // setTimeout(()=>{},5000)


            return res.send({
                data: datas,
                message: "Success"
            });

        } catch (error: any) {
            return res.status(500).send({ message: error.message });
        }
    }
    // ! PERKELAS-END

}

export default new Studiv2ProsesController();