"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const siswadetail = (sequelize, Sequelize) => {
    const siswadetail = sequelize.define("siswadetail", {
        siswa_id: {
            type: Sequelize.BIGINT,
            allowNull: false
        },
        apiprobk_id: {
            type: Sequelize.BIGINT,
            allowNull: false
        },
        status: {
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
            singular: 'siswadetail',
            plural: 'siswadetail',
        },
        freezeTableName: true,
        timestamps: false,
        tableName: 'siswadetail',
        underscored: true,
        modelName: 'siswadetail'
    });
    return siswadetail;
};
exports.default = siswadetail;
