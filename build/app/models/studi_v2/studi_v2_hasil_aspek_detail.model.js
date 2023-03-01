"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const studi_v2_hasil_aspek_detail = (sequelize, Sequelize) => {
    const studi_v2_hasil_aspek_detail = sequelize.define("studi_v2_hasil_aspek_detail", {
        // data
        // urutan: {
        //     type: Sequelize.INTEGER,
        //     allowNull: true
        // },
        status: {
            type: Sequelize.STRING,
            allowNull: true
        },
        aspek_detail_nama: {
            type: Sequelize.STRING,
            allowNull: true
        },
        nilai_akhir: {
            type: Sequelize.FLOAT,
            allowNull: true
        },
        nilai_akhir_revisi: {
            type: Sequelize.FLOAT,
            allowNull: true
        },
        skor_total: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        soal_jml: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        soal_max_skor: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        // relasi
        studi_v2_hasil_id: {
            type: Sequelize.BIGINT,
            allowNull: true
        },
        studi_v2_paketsoal_aspek_detail_id: {
            type: Sequelize.BIGINT,
            allowNull: true
        },
        // studi_v2_paketsoal_aspek_id: {
        //     type: Sequelize.BIGINT,
        //     allowNull: true
        // },
        // timestamp
        deleted_at: {
            field: 'deleted_at',
            type: Sequelize.DATE,
            allowNull: true
        },
        created_at: {
            field: 'created_at',
            type: Sequelize.DATE,
            allowNull: true
        },
        updated_at: {
            field: 'updated_at',
            type: Sequelize.DATE,
            allowNull: true
        },
    }, {
        name: {
            singular: 'studi_v2_hasil_aspek_detail',
            plural: 'studi_v2_hasil_aspek_detail',
        },
        freezeTableName: true,
        timestamps: false,
        tableName: 'studi_v2_hasil_aspek_detail',
        underscored: true,
        modelName: 'studi_v2_hasil_aspek_detail'
    });
    return studi_v2_hasil_aspek_detail;
};
exports.default = studi_v2_hasil_aspek_detail;
