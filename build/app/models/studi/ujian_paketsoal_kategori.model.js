"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ujian_paketsoal_kategori = (sequelize, Sequelize) => {
    const ujian_paketsoal_kategori = sequelize.define("ujian_paketsoal_kategori", {
        // data
        nama: {
            type: Sequelize.STRING,
            allowNull: true
        },
        instruksi: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        instruksi_status: {
            type: Sequelize.STRING,
            allowNull: true
        },
        lembar_prasoal: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        lembar_prasoal_status: {
            type: Sequelize.STRING,
            allowNull: true
        },
        instruksi_pengerjaan: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        instruksi_pengerjaan_status: {
            type: Sequelize.STRING,
            allowNull: true
        },
        random_soal: {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: "Aktif"
        },
        random_pilihanjawaban: {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: "Aktif"
        },
        // settings
        waktu: {
            type: Sequelize.STRING,
            allowNull: true
        },
        // relasi
        ujian_paketsoal_id: {
            type: Sequelize.BIGINT,
            allowNull: true
        },
        ujian_kategori_id: {
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
            singular: 'ujian_paketsoal_kategori',
            plural: 'ujian_paketsoal_kategori',
        },
        freezeTableName: true,
        timestamps: false,
        tableName: 'ujian_paketsoal_kategori',
        underscored: true,
        modelName: 'ujian_paketsoal_kategori'
    });
    return ujian_paketsoal_kategori;
};
exports.default = ujian_paketsoal_kategori;
