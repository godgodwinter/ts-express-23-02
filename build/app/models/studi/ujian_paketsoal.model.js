"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ujian_paketsoal = (sequelize, Sequelize) => {
    const ujian_paketsoal = sequelize.define("ujian_paketsoal", {
        // data
        nama: {
            type: Sequelize.STRING,
            allowNull: true
        },
        // settings
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
        status: {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: "Aktif"
        },
        // relasi
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
            singular: 'ujian_paketsoal',
            plural: 'ujian_paketsoal',
        },
        freezeTableName: true,
        timestamps: false,
        tableName: 'ujian_paketsoal',
        underscored: true,
        modelName: 'ujian_paketsoal'
    });
    return ujian_paketsoal;
};
exports.default = ujian_paketsoal;
