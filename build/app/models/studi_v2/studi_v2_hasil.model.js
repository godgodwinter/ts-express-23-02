"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const studi_v2_hasil = (sequelize, Sequelize) => {
    const studi_v2_hasil = sequelize.define("studi_v2_hasil", {
        // data
        status: {
            type: Sequelize.STRING,
            allowNull: false
        },
        tgl_ujian: {
            type: Sequelize.STRING,
            allowNull: true
        },
        // relasi
        studi_v2_proses_id: {
            type: Sequelize.BIGINT,
            allowNull: true
        },
        studi_v2_paketsoal_id: {
            type: Sequelize.BIGINT,
            allowNull: true
        },
        siswa_id: {
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
            singular: 'studi_v2_hasil',
            plural: 'studi_v2_hasil',
        },
        freezeTableName: true,
        timestamps: false,
        tableName: 'studi_v2_hasil',
        underscored: true,
        modelName: 'studi_v2_hasil'
    });
    return studi_v2_hasil;
};
exports.default = studi_v2_hasil;
