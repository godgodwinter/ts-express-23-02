"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fn_get_sisa_waktu = void 0;
const moment = require('moment');
const localization = require('moment/locale/id');
moment.updateLocale("id", localization);
const fn_get_sisa_waktu = async (tgl_selesai) => {
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
        result.detik = parseInt(duration.asSeconds().toFixed(0));
        result.menit = parseFloat(duration.asMinutes().toFixed(2));
        result.now = now;
        result.selesai = selesai;
        // result = parseInt(Date.parse(tgl_selesai)) - parseInt(Date.parse(moment().format("YYYY-MM-DD H:i:s")));
        // console.log(result);
        // const response = await Siswa.findOne({ where: { id }, include: kelas });
        return result;
    }
    catch (error) {
        console.log(error.message);
        throw (error);
    }
};
exports.fn_get_sisa_waktu = fn_get_sisa_waktu;
