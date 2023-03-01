"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const studi_v2_paketsoal = (sequelize, Sequelize) => {
    const studi_v2_paketsoal = sequelize.define("studi_v2_paketsoal", {
        // data
        nama: {
            type: Sequelize.STRING,
            allowNull: false
        },
        prefix: {
            type: Sequelize.STRING,
            allowNull: true
        },
        kode: {
            type: Sequelize.STRING,
            allowNull: true
        },
        tgl: {
            type: Sequelize.STRING,
            allowNull: true
        },
        users_id: {
            type: Sequelize.BIGINT,
            allowNull: true
        },
        users_tipe: {
            type: Sequelize.STRING,
            allowNull: true
        },
        status: {
            type: Sequelize.STRING,
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
            singular: 'studi_v2_paketsoal',
            plural: 'studi_v2_paketsoal',
        },
        freezeTableName: true,
        timestamps: false,
        tableName: 'studi_v2_paketsoal',
        underscored: true,
        modelName: 'studi_v2_paketsoal'
    });
    return studi_v2_paketsoal;
};
exports.default = studi_v2_paketsoal;
