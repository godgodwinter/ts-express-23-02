"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const paket = (sequelize, Sequelize) => {
    const paket = sequelize.define("paket", {
        nama: {
            type: Sequelize.STRING,
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
            singular: 'paket',
            plural: 'paket',
        },
        freezeTableName: true,
        timestamps: false,
        tableName: 'paket',
        underscored: true,
        modelName: 'paket'
    });
    return paket;
};
exports.default = paket;
