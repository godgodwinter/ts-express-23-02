"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ujian_proses_kelas_siswa_kategori_hasil = (sequelize, Sequelize) => {
    const ujian_proses_kelas_siswa_kategori_hasil = sequelize.define("ujian_proses_kelas_siswa_kategori_hasil", {
        // data
        kode_soal: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        kode_jawaban: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        status_jawaban: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        skor: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        // settings
        // relasi
        ujian_paketsoal_soal_id: {
            type: Sequelize.BIGINT,
            allowNull: true
        },
        ujian_paketsoal_soal_pilihanjawaban_id: {
            type: Sequelize.BIGINT,
            allowNull: true
        },
        ujian_proses_kelas_siswa_kategori_id: {
            type: Sequelize.BIGINT,
            allowNull: true
        },
        // timestamp
        created_at: {
            field: 'created_at',
            type: Sequelize.DATE,
        },
        updated_at: {
            field: 'updated_at',
            type: Sequelize.DATE,
        },
    }, {
        name: {
            singular: 'ujian_proses_kelas_siswa_kategori_hasil',
            plural: 'ujian_proses_kelas_siswa_kategori_hasil',
        },
        freezeTableName: true,
        timestamps: false,
        tableName: 'ujian_proses_kelas_siswa_kategori_hasil',
        underscored: true,
        modelName: 'ujian_proses_kelas_siswa_kategori_hasil'
    });
    return ujian_proses_kelas_siswa_kategori_hasil;
};
exports.default = ujian_proses_kelas_siswa_kategori_hasil;
