"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ujian_banksoal_aspek = (sequelize, Sequelize) => {
    const ujian_banksoal_aspek = sequelize.define("ujian_banksoal_aspek", {
        // data
        nama: {
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
        // settings
        // relasi
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
            singular: 'ujian_banksoal_aspek',
            plural: 'ujian_banksoal_aspek',
        },
        freezeTableName: true,
        timestamps: false,
        tableName: 'ujian_banksoal_aspek',
        underscored: true,
        modelName: 'ujian_banksoal_aspek'
    });
    return ujian_banksoal_aspek;
};
exports.default = ujian_banksoal_aspek;
