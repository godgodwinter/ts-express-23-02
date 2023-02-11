"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ujian_proses = (sequelize, Sequelize) => {
    const ujian_proses = sequelize.define("ujian_proses", {
        // data
        // settings
        status: {
            type: Sequelize.STRING,
            allowNull: true
        },
        prefix: {
            type: Sequelize.STRING,
            allowNull: true
        },
        tipe: {
            type: Sequelize.STRING,
            allowNull: true
        },
        tgl: {
            type: Sequelize.STRING,
            allowNull: true
        },
        tgl_akhir: {
            type: Sequelize.STRING,
            allowNull: true
        },
        // relasi
        sekolah_id: {
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
            singular: 'ujian_proses',
            plural: 'ujian_proses',
        },
        freezeTableName: true,
        timestamps: false,
        tableName: 'ujian_proses',
        underscored: true,
        modelName: 'ujian_proses'
    });
    return ujian_proses;
};
exports.default = ujian_proses;
