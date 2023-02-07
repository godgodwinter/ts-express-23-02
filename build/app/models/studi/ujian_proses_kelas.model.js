"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ujian_proses_kelas = (sequelize, Sequelize) => {
    const ujian_proses_kelas = sequelize.define("ujian_proses_kelas", {
        // data
        // settings
        status: {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: "Aktif"
        },
        // relasi
        kelas_id: {
            type: Sequelize.BIGINT,
            allowNull: true
        },
        paketsoal_id: {
            type: Sequelize.BIGINT,
            allowNull: true
        },
        ujian_proses_id: {
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
            singular: 'ujian_proses_kelas',
            plural: 'ujian_proses_kelas',
        },
        freezeTableName: true,
        timestamps: false,
        tableName: 'ujian_proses_kelas',
        underscored: true,
        modelName: 'ujian_proses_kelas'
    });
    return ujian_proses_kelas;
};
exports.default = ujian_proses_kelas;
