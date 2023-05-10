"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const masterdeteksi = (sequelize, Sequelize) => {
    const masterdeteksi = sequelize.define("masterdeteksi", {
        nama: {
            type: Sequelize.STRING,
            allowNull: false
        },
        singkatan: {
            type: Sequelize.STRING,
            allowNull: false
        },
        positif: {
            type: Sequelize.STRING,
            allowNull: true
        },
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
            singular: 'masterdeteksi',
            plural: 'masterdeteksi',
        },
        freezeTableName: true,
        timestamps: false,
        tableName: 'masterdeteksi',
        underscored: true,
        modelName: 'masterdeteksi'
    });
    return masterdeteksi;
};
exports.default = masterdeteksi;
