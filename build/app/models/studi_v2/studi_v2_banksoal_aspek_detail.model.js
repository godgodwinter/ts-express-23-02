"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const studi_v2_banksoal_aspek_detail = (sequelize, Sequelize) => {
    const studi_v2_banksoal_aspek_detail = sequelize.define("studi_v2_banksoal_aspek_detail", {
        // data
        nama: {
            type: Sequelize.STRING,
            allowNull: false
        },
        kode: {
            type: Sequelize.STRING,
            allowNull: true
        },
        prefix: {
            type: Sequelize.STRING,
            allowNull: true
        },
        desc: {
            type: Sequelize.STRING,
            allowNull: true
        },
        urutan: {
            type: Sequelize.BIGINT,
            allowNull: true
        },
        waktu: {
            type: Sequelize.STRING,
            allowNull: true
        },
        instruksi: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        instruksi_status: {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: "Nonaktif"
        },
        lembar_prasoal: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        lembar_prasoal_status: {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: "Nonaktif"
        },
        instruksi_pengerjaan: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        instruksi_pengerjaan_status: {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: "Nonaktif"
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
            singular: 'studi_v2_banksoal_aspek_detail',
            plural: 'studi_v2_banksoal_aspek_detail',
        },
        freezeTableName: true,
        timestamps: false,
        tableName: 'studi_v2_banksoal_aspek_detail',
        underscored: true,
        modelName: 'studi_v2_banksoal_aspek_detail'
    });
    return studi_v2_banksoal_aspek_detail;
};
exports.default = studi_v2_banksoal_aspek_detail;
