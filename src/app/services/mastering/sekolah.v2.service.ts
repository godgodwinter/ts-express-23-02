
import db from "../../models";
import { Request, Response } from 'express';

const { siswa, kelas, sekolah, paket } = db;
class sekolahService {

    body: Request['body'];
    params: Request['params'];

    constructor(req: Request) {
        this.body = req.body;
        this.params = req.params;
    }

    sekolahGetAll = async () => {
        try {
            // Mengambil data sekolah
            const sekolahData = await sekolah.findAll({
                where: { deleted_at: null },
                // attributes: ['id', 'nama', 'status', 'kepsek_nama', 'tahunajaran_nama', 'semester_nama', 'kecamatan', 'kabupaten', 'provinsi', 'paket_id'],
                include: [
                    {
                        model: db.paket,
                        attributes: ['id', 'nama']
                    }
                ]
            });

            // Menghitung jumlah kelas untuk setiap sekolah
            const sekolahWithKelas = await Promise.all(sekolahData.map(async (sekolahItem: any) => {
                const kelasCount = await db.kelas.count({
                    where: { sekolah_id: sekolahItem.id, deleted_at: null }
                });

                const kelasData = await db.kelas.findAll({
                    where: { sekolah_id: sekolahItem.id, deleted_at: null }
                });

                return {
                    ...sekolahItem.toJSON(),
                    kelas_jml: kelasCount,
                    kelas: kelasData
                };
            }));

            // Menghitung jumlah siswa untuk setiap sekolah
            const sekolahWithCounts = await Promise.all(sekolahWithKelas.map(async (sekolahItem) => {
                const siswaCount = await db.siswa.count({
                    where: { sekolah_id: sekolahItem.id, deleted_at: null }
                });

                return {
                    ...sekolahItem,
                    siswa_jml: siswaCount
                };
            }));

            console.log(`Jumlah sekolah: ${sekolahWithCounts.length}`);

            return sekolahWithCounts;
        } catch (error: any) {
            console.log(error.message);
        }
    };

    // sekolahGetAll = async () => {
    //     try {
    //         const response = await sekolah.findAll({
    //             where: { deleted_at: null },
    //             attributes: {
    //                 include: [
    //                     [db.Sequelize.fn('COUNT', db.Sequelize.fn('DISTINCT', db.Sequelize.col('kelas.id'))), 'kelas_jml'],
    //                     [db.Sequelize.literal('(SELECT COUNT(DISTINCT `siswa`.`id`) FROM `siswa` WHERE `siswa`.`sekolah_id` = `sekolah`.`id`)'), 'siswa_jml']
    //                 ]
    //             },
    //             include: [
    //                 {
    //                     model: db.kelas,
    //                     attributes: ['id', 'nama']
    //                 },
    //                 {
    //                     model: db.paket,
    //                     attributes: ['id', 'nama']
    //                 },
    //             ],
    //             group: ['sekolah.id'],
    //         });

    //         console.log(`jml sekolah : ${response.length}`);

    //         return response;
    //     } catch (error: any) {
    //         console.log(error.message);
    //     }
    // };


    // sekolahGetAll = async () => {
    //     try {
    //         const response = await sekolah.findAll({
    //             where: { deleted_at: null }, include: [{
    //                 model: db.paket,
    //                 attributes: ['nama']
    //             }, {
    //                 model: db.kelas,
    //                 attributes: ['id', 'nama']
    //             }]
    //         });

    //         return response;
    //     } catch (error: any) {
    //         console.log(error.message);
    //     }
    // }

    sekolahGetWhereId = async (sekolah_id: number) => {
        try {
            const response = await sekolah.findOne({
                where: { id: sekolah_id, deleted_at: null }
            });
            const getKelas = await kelas.findAll({ where: { sekolah_id, deleted_at: null } })
            response.setDataValue("kelas", getKelas)

            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }
    delete_sekolahGetWhereId = async (sekolah_id: number) => {
        try {
            // Mencari data sekolah berdasarkan ID yang akan dihapus
            const sekolahToDelete = await sekolah.findOne({
                where: { id: sekolah_id, deleted_at: null }
            });

            // Jika data sekolah ditemukan, hapus data tersebut
            if (sekolahToDelete) {
                await sekolahToDelete.destroy();
                console.log(`Sekolah dengan ID ${sekolah_id} berhasil dihapus.`);
                return { message: `Sekolah dengan ID ${sekolah_id} berhasil dihapus.` };
            } else {
                console.log(`Sekolah dengan ID ${sekolah_id} tidak ditemukan.`);
                return { message: `Sekolah dengan ID ${sekolah_id} tidak ditemukan.` };
            }
        } catch (error: any) {
            console.log(error.message);
            return { error: error.message };
        }
    }


    sekolahStore = async () => {
        try {
            const dataSave = await sekolah.create({
                nama: this.body.nama,
                alamat: this.body.alamat,
                status: this.body.status,
                kepsek_nama: this.body.kepsek_nama,
                tahunajaran_nama: this.body.tahunajaran_nama,
                semester_nama: this.body.semester_nama,
                kecamatan: this.body.kecamatan,
                kabupaten: this.body.kabupaten,
                provinsi: this.body.provinsi,
                paket_id: this.body.paket_id,
            });

            return dataSave
        } catch (error: any) {
            console.log(error.message);
        }
    }

    sekolahUpdateWhereId = async (sekolah_id: number, dataBody: any) => {
        try {
            const id = sekolah_id;
            const {
                nama,
                alamat,
                status,
                kepsek_nama,
                tahunajaran_nama,
                semester_nama,
                kecamatan,
                kabupaten,
                provinsi,
                paket_id,
            } = dataBody; // Mengambil data dari body request

            // Mencari data sekolah berdasarkan ID
            const sekolahData = await sekolah.findByPk(id);


            const updateFields: any = {
                nama,
                alamat,
                status,
                kepsek_nama,
                tahunajaran_nama,
                semester_nama,
                paket_id,
            };

            if (kecamatan !== null) {
                updateFields.kecamatan = kecamatan;
            }
            if (kabupaten !== null) {
                updateFields.kabupaten = kabupaten;
            }
            if (provinsi !== null) {
                updateFields.provinsi = provinsi;
            }

            // Update data sekolah dengan fields yang ada
            const updatedSekolah = await sekolahData.update(updateFields);

            return updatedSekolah;
        } catch (error: any) {
            console.error(error.message);
            // return res.status(500).json({ message: "Terjadi kesalahan server" });
        }
    };



}

export default sekolahService;