

const moment = require('moment');
const localization = require('moment/locale/id')
moment.updateLocale("id", localization);
interface IFn_Sisa_Waktu {
    detik: number,
    menit: number,
    now: number | null,
    selesai: number | null
}
export const fn_get_sisa_waktu = async (tgl_selesai: string): Promise<IFn_Sisa_Waktu> => {
    try {
        let result: IFn_Sisa_Waktu = {
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
        throw (error)
    }
}