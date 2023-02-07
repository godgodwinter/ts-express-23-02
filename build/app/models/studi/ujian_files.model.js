"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ujian_files = (sequelize, Sequelize) => {
    const ujian_files = sequelize.define("ujian_files", {
        // data
        nama: {
            type: Sequelize.STRING,
            allowNull: true
        },
        desc: {
            type: Sequelize.STRING,
            allowNull: true
        },
        // settings
        files: {
            type: Sequelize.STRING,
            allowNull: true
        },
        prefix: {
            type: Sequelize.STRING,
            allowNull: true
        },
        kode_soal: {
            type: Sequelize.STRING,
            allowNull: true
        },
        urutan: {
            type: Sequelize.STRING,
            allowNull: true
        },
        status: {
            type: Sequelize.STRING,
            allowNull: true
        },
        // relasi
        parrent_id: {
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
            singular: 'ujian_files',
            plural: 'ujian_files',
        },
        freezeTableName: true,
        timestamps: false,
        tableName: 'ujian_files',
        underscored: true,
        modelName: 'ujian_files'
    });
    return ujian_files;
};
exports.default = ujian_files;
