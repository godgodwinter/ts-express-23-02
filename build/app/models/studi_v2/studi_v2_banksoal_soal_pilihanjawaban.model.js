"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const studi_v2_banksoal_soal_pilihanjawaban = (sequelize, Sequelize) => {
    const studi_v2_banksoal_soal_pilihanjawaban = sequelize.define("studi_v2_banksoal_soal_pilihanjawaban", {
        // data
        kode_jawaban: {
            type: Sequelize.STRING,
            allowNull: false
        },
        jawaban: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        skor: {
            type: Sequelize.STRING,
            allowNull: true
        },
        // relasi
        kode_soal: {
            type: Sequelize.STRING,
            allowNull: false
        },
        studi_v2_banksoal_soal_id: {
            type: Sequelize.BIGINT,
            allowNull: true
        },
        // timestamp
        deleted_at: {
            field: 'deleted_at',
            type: Sequelize.DATE,
            allowNull: true
        },
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
            singular: 'studi_v2_banksoal_soal_pilihanjawaban',
            plural: 'studi_v2_banksoal_soal_pilihanjawaban',
        },
        freezeTableName: true,
        timestamps: false,
        tableName: 'studi_v2_banksoal_soal_pilihanjawaban',
        underscored: true,
        modelName: 'studi_v2_banksoal_soal_pilihanjawaban'
    });
    return studi_v2_banksoal_soal_pilihanjawaban;
};
exports.default = studi_v2_banksoal_soal_pilihanjawaban;
