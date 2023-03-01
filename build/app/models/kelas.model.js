"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kelas = (sequelize, Sequelize) => {
    const kelas = sequelize.define("kelas", {
        nama: {
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
            singular: 'kelas',
            plural: 'kelas',
        },
        freezeTableName: true,
        timestamps: false,
        tableName: 'kelas',
        underscored: true,
        modelName: 'kelas'
    });
    return kelas;
};
exports.default = kelas;
