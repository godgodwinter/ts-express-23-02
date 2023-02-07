"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ujian_banksoal = (sequelize, Sequelize) => {
    const ujian_banksoal = sequelize.define("ujian_banksoal", {
        // data
        pertanyaan: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        kode_soal: {
            type: Sequelize.STRING,
            allowNull: true
        },
        kode: {
            type: Sequelize.STRING,
            allowNull: true
        },
        nomer_urut: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        desc: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        persentase: {
            type: Sequelize.STRING,
            allowNull: true
        },
        // settings
        tipe: {
            type: Sequelize.STRING,
            allowNull: true
        },
        status: {
            type: Sequelize.STRING,
            allowNull: true
        },
        tingkatkesulitan: {
            type: Sequelize.STRING,
            allowNull: true
        },
        // relasi
        ujian_kategori_id: {
            type: Sequelize.BIGINT,
            allowNull: true
        },
        // timestamp
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
            singular: 'ujian_banksoal',
            plural: 'ujian_banksoal',
        },
        freezeTableName: true,
        timestamps: false,
        tableName: 'ujian_banksoal',
        underscored: true,
        modelName: 'ujian_banksoal'
    });
    return ujian_banksoal;
};
exports.default = ujian_banksoal;
