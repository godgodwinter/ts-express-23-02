"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const studi_v2_paketsoal_aspek_penilaian = (sequelize, Sequelize) => {
    const studi_v2_paketsoal_aspek_penilaian = sequelize.define("studi_v2_paketsoal_aspek_penilaian", {
        // RELASI
        studi_v2_paketsoal_aspek_id: {
            type: Sequelize.BIGINT,
            allowNull: true
        },
        studi_v2_paketsoal_aspek_detail_id: {
            type: Sequelize.BIGINT,
            allowNull: true
        },
        studi_v2_paketsoal_id: {
            type: Sequelize.BIGINT,
            allowNull: true
        },
        status: {
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
            singular: 'studi_v2_paketsoal_aspek_penilaian',
            plural: 'studi_v2_paketsoal_aspek_penilaian',
        },
        freezeTableName: true,
        timestamps: false,
        tableName: 'studi_v2_paketsoal_aspek_penilaian',
        underscored: true,
        modelName: 'studi_v2_paketsoal_aspek_penilaian'
    });
    return studi_v2_paketsoal_aspek_penilaian;
};
exports.default = studi_v2_paketsoal_aspek_penilaian;
