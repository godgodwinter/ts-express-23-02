
import db from "../models";
import { Request, Response } from 'express';
const moment = require('moment');
const localization = require('moment/locale/id')
moment.updateLocale("id", localization);

const {
    siswa, kelas, ujian_proses_kelas,
    ujian_paketsoal,
    ujian_proses_kelas_siswa,
    ujian_proses_kelas_siswa_kategori,
}
    = db;
class StudiService {
    meId: number;
    body: Request['body'];
    params: Request['params'];

    constructor(req: Request) {
        this.meId = req.app.locals.meId;
        this.body = req.body;
        this.params = req.params;
    }

    // * SERVICE
    getDataUjian = async () => {
        console.log('====================================');
        console.log(this.meId);
        console.log('====================================');
        const me: any = await this.fn_get_me(this.meId)
        let dataUjian: {} = {};

        const response = await ujian_proses_kelas.findAll({ where: { kelas_id: me?.kelas?.id }, include: [db.ujian_proses] });
        dataUjian = response;
        let data = [];
        for (const tempData of response) {
            tempData.setDataValue("tgl", tempData?.ujian_proses?.tgl)
            tempData.setDataValue("ujian_proses_status", tempData?.ujian_proses?.status);
            const paketsoal = await ujian_paketsoal.findOne({ where: { id: tempData.paketsoal_id } });
            tempData.setDataValue("nama", paketsoal?.nama)
            data.push(tempData)
        }
        return data;
    }

    periksaUjianAktif = async () => {
        const me: any = await this.fn_get_me(this.meId)

        let data: null | any = null;
        const resProsesKelas = await ujian_proses_kelas.findOne({ where: { kelas_id: me?.kelas?.id }, include: [db.ujian_proses] });
        let ujian_proses_kelas_id: number = resProsesKelas.id;
        // console.log('====================================');
        // console.log(ujian_proses_kelas_id);
        // console.log('====================================');
        const resProsesKelasSiswa = await ujian_proses_kelas_siswa.findOne({ where: { ujian_proses_kelas_id, siswa_id: this.meId } });
        let ujianProsesKelasSiswaId = resProsesKelasSiswa.id;
        console.log('====================================');
        console.log(ujianProsesKelasSiswaId);
        console.log('====================================');
        const resProsesKelasSiswaKategori = await ujian_proses_kelas_siswa_kategori.findOne({ where: { ujian_proses_kelas_siswa_id: ujianProsesKelasSiswaId, status: 'Aktif' }, order: [['updated_at', 'desc']] });
        let { id, ujian_proses_kelas_siswa_id, status, hasil_per_kategori, tgl_mulai, tgl_selesai, waktu, ujian_paketsoal_kategori_id, created_at, updated_at } = resProsesKelasSiswaKategori;
        data = { id, ujian_proses_kelas_siswa_id, status, hasil_per_kategori, tgl_mulai, tgl_selesai, waktu, ujian_paketsoal_kategori_id, created_at, updated_at };
        // console.log(moment().format("YYYY-MMMM-DD"));
        let getSisaWaktu = await this.fn_get_sisa_waktu(tgl_selesai);
        data.sisa_waktu = getSisaWaktu?.detik;
        data.sisa_waktu_dalam_menit = getSisaWaktu?.menit;
        data.ujian_proses_kelas_id = ujian_proses_kelas_id;
        data.ujian_proses_kelas_siswa = resProsesKelasSiswa;
        data.getSisaWaktu = getSisaWaktu;
        if (data.sisa_waktu < 0) {
            return null
        }
        return data;
    }

    getDataUjianEdit = async (ujian_proses_kelas_id: number) => {
        try {
            const me: any = await this.fn_get_me(this.meId)
            let data = null;
            const resProsesKelas = await ujian_proses_kelas.findOne({ where: { id: ujian_proses_kelas_id }, include: [db.ujian_proses] });
            let ujianProsesId = resProsesKelas.ujian_proses_id;
            const resGetUjianProses = await db.ujian_proses.findOne({ where: { id: ujianProsesId } })
            return resGetUjianProses;
        } catch (error: any) {
            console.log(error.message);
        }
    };
    // * SERVICE-END

    // * FUNGSI-DB
    fn_get_me = async (meId: number): Promise<Response | undefined> => {
        try {
            const response = await siswa.findOne({ where: { id: meId }, include: kelas });
            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }
    // * FUNGSI-DB-END

    // * FUNGSI-BIASA
    fn_get_sisa_waktu = async (tgl_selesai: string): Promise<any> => {
        try {
            let result = {
                detik: 0,
                menit: 0,
                now: null,
                selesai: null
            };
            let selesai = moment(tgl_selesai);
            let now = moment();
            let duration = moment.duration(selesai.diff(now));
            result.detik = parseInt(duration.asSeconds().toFixed(0))
            result.menit = parseFloat(duration.asMinutes().toFixed(2))
            result.now = now
            result.selesai = selesai
            // result = parseInt(Date.parse(tgl_selesai)) - parseInt(Date.parse(moment().format("YYYY-MM-DD H:i:s")));
            // console.log(result);
            // const response = await Siswa.findOne({ where: { id }, include: kelas });
            return result;
        } catch (error: any) {
            console.log(error.message);
        }
    }
    // * FUNGSI-BIASA-END

}

export default StudiService;