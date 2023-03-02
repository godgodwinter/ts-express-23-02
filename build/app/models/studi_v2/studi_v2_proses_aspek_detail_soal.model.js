"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const studi_v2_proses_aspek_detail_soal = (sequelize, Sequelize) => {
    const studi_v2_proses_aspek_detail_soal = sequelize.define("studi_v2_proses_aspek_detail_soal", {
        // data
        soal_pertanyaan: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        kode_soal: {
            type: Sequelize.STRING,
            allowNull: false
        },
        kode_jawaban: {
            type: Sequelize.STRING,
            allowNull: true
        },
        status_jawaban: {
            type: Sequelize.STRING,
            allowNull: true
        },
        skor: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        // relasi
        studi_v2_proses_aspek_detail_id: {
            type: Sequelize.BIGINT,
            allowNull: true
        },
        studi_v2_paketsoal_soal_id: {
            type: Sequelize.BIGINT,
            allowNull: true
        },
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
            singular: 'studi_v2_proses_aspek_detail_soal',
            plural: 'studi_v2_proses_aspek_detail_soal',
        },
        freezeTableName: true,
        timestamps: false,
        tableName: 'studi_v2_proses_aspek_detail_soal',
        underscored: true,
        modelName: 'studi_v2_proses_aspek_detail_soal',
        scopes: {
            lessData: {
                attributes: { exclude: ['status_jawaban', 'skor'] },
            }
        }
    });
    return studi_v2_proses_aspek_detail_soal;
};
exports.default = studi_v2_proses_aspek_detail_soal;
