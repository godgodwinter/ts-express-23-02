

const moment = require('moment');
const localization = require('moment/locale/id')
moment.updateLocale("id", localization);
interface IFn_Sisa_Waktu {
    detik: number,
    menit: number,
    now: number | null,
    selesai: number | null
}

export const fn_deteksimasalah = (item: number): string => {
    let hasil = "Angka tidak valid!";
    if (item > 90) {
        hasil = "Sangat Tinggi Sekali / Sangat Mengganggu Sekali";
    } else if (91 > item && item >= 81) {
        hasil = "Tinggi Sekali / Mengganggu Sekali";
    } else if (81 > item && item >= 71) {
        hasil = "Tinggi / Mengganggu";
    } else if (71 > item && item >= 61) {
        hasil = "Cukup Tinggi / Cukup Mengganggu";
    } else if (61 > item && item >= 41) {
        hasil = "Cukup / Terkendali";
    } else if (41 > item && item >= 31) {
        hasil = "Agak Rendah / Cukup Terkendali";
    } else if (31 > item && item >= 21) {
        hasil = "Rendah / Terkendali Baik";
    } else if (21 > item && item >= 11) {
        hasil = "Rendah Sekali / Terkendali Baik Sekali";
    } else {
        hasil = "Sangat Rendah Sekali / Sangat Terkendali Baik Sekali";
    }
    return hasil;
};

export const fn_deteksimasalah_singkatan = (item: number): string => {
    let hasil = "Angka tidak valid!";
    if (item > 90) {
        hasil = "STS";
    } else if (91 > item && item >= 81) {
        hasil = "TS";
    } else if (81 > item && item >= 71) {
        hasil = "T";
    } else if (71 > item && item >= 61) {
        hasil = "CT";
    } else if (61 > item && item >= 41) {
        hasil = "C";
    } else if (41 > item && item >= 31) {
        hasil = "AR";
    } else if (31 > item && item >= 21) {
        hasil = "R";
    } else if (21 > item && item >= 11) {
        hasil = "RS";
    } else {
        hasil = "SRS";
    }
    return hasil;
};
