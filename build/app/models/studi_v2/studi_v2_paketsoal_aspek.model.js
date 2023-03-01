"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const studi_v2_paketsoal_aspek = (sequelize, Sequelize) => {
    const studi_v2_paketsoal_aspek = sequelize.define("studi_v2_paketsoal_aspek", {
        // data
        nama: {
            type: Sequelize.STRING,
            allowNull: false
        },
        kode: {
            type: Sequelize.STRING,
            allowNull: true
        },
        desc: {
            type: Sequelize.STRING,
            allowNull: true
        },
        status: {
            type: Sequelize.STRING,
            allowNull: true
        },
        tipe: {
            type: Sequelize.STRING,
            allowNull: true
        },
        urutan: {
            type: Sequelize.BIGINT,
            allowNull: true
        },
        // RELASI
        studi_v2_paketsoal_id: {
            type: Sequelize.BIGINT,
            allowNull: true
        },
        studi_v2_banksoal_aspek_id: {
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
            singular: 'studi_v2_paketsoal_aspek',
            plural: 'studi_v2_paketsoal_aspek',
        },
        freezeTableName: true,
        timestamps: false,
        tableName: 'studi_v2_paketsoal_aspek',
        underscored: true,
        modelName: 'studi_v2_paketsoal_aspek'
    });
    return studi_v2_paketsoal_aspek;
};
exports.default = studi_v2_paketsoal_aspek;
