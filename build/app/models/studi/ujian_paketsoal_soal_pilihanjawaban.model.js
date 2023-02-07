"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ujian_paketsoal_soal_pilihanjawaban = (sequelize, Sequelize) => {
    const ujian_paketsoal_soal_pilihanjawaban = sequelize.define("ujian_paketsoal_soal_pilihanjawaban", {
        // data
        kode_jawaban: {
            type: Sequelize.STRING,
            allowNull: true
        },
        jawaban: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        skor: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        kode_soal: {
            type: Sequelize.STRING,
            allowNull: true
        },
        // settings
        // relasi
        ujian_paketsoal_soal_id: {
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
            singular: 'ujian_paketsoal_soal_pilihanjawaban',
            plural: 'ujian_paketsoal_soal_pilihanjawaban',
        },
        freezeTableName: true,
        timestamps: false,
        tableName: 'ujian_paketsoal_soal_pilihanjawaban',
        underscored: true,
        modelName: 'ujian_paketsoal_soal_pilihanjawaban'
    });
    return ujian_paketsoal_soal_pilihanjawaban;
};
exports.default = ujian_paketsoal_soal_pilihanjawaban;
