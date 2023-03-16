"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const studi_v2_proses = (sequelize, Sequelize) => {
    const studi_v2_proses = sequelize.define("studi_v2_proses", {
        // data
        paketsoal_nama: {
            type: Sequelize.STRING,
            allowNull: true
        },
        status: {
            type: Sequelize.STRING,
            allowNull: false
        },
        tgl_ujian: {
            type: Sequelize.DATE,
            allowNull: true
        },
        // relasi
        siswa_id: {
            type: Sequelize.BIGINT,
            allowNull: true
        },
        studi_v2_paketsoal_id: {
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
            singular: 'studi_v2_proses',
            plural: 'studi_v2_proses',
        },
        freezeTableName: true,
        timestamps: false,
        tableName: 'studi_v2_proses',
        underscored: true,
        modelName: 'studi_v2_proses'
    });
    return studi_v2_proses;
};
exports.default = studi_v2_proses;
