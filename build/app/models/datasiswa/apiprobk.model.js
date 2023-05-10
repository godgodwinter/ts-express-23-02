"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apiprobk = (sequelize, Sequelize) => {
    const apiprobk = sequelize.define("apiprobk", {
        username: {
            type: Sequelize.STRING,
            allowNull: true
        },
        prefix: {
            type: Sequelize.STRING,
            allowNull: true
        },
        sertifikat: {
            type: Sequelize.STRING,
            allowNull: true
        },
        sertifikat_tgl: {
            type: Sequelize.STRING,
            allowNull: true
        },
        deteksi: {
            type: Sequelize.STRING,
            allowNull: true
        },
        deteksi_tgl: {
            type: Sequelize.STRING,
            allowNull: true
        },
        sinkron: {
            type: Sequelize.STRING,
            allowNull: true
        },
        sinkron_tgl: {
            type: Sequelize.STRING,
            allowNull: true
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
            singular: 'apiprobk',
            plural: 'apiprobk',
        },
        freezeTableName: true,
        timestamps: false,
        tableName: 'apiprobk',
        underscored: true,
        modelName: 'apiprobk'
    });
    return apiprobk;
};
exports.default = apiprobk;
