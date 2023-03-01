"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sekolah = (sequelize, Sequelize) => {
    const sekolah = sequelize.define("sekolah", {
        nama: {
            type: Sequelize.STRING,
            allowNull: true
        },
        status: {
            type: Sequelize.STRING,
            allowNull: true
        },
        // relasi
        paket_id: {
            type: Sequelize.BIGINT,
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
            singular: 'sekolah',
            plural: 'sekolah',
        },
        freezeTableName: true,
        timestamps: false,
        tableName: 'sekolah',
        underscored: true,
        modelName: 'sekolah'
    });
    return sekolah;
};
exports.default = sekolah;
