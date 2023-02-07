"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const siswa = (sequelize, Sequelize) => {
    const Siswa = sequelize.define("siswa", {
        nama: {
            type: Sequelize.STRING,
            allowNull: false
        },
        nomeridentitas: {
            type: Sequelize.STRING,
            allowNull: false
        },
        username: {
            type: Sequelize.STRING,
            allowNull: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: true
        },
        jk: {
            type: Sequelize.STRING,
            allowNull: true
        },
        telp: {
            type: Sequelize.STRING,
            allowNull: true
        },
        kelas_id: {
            field: 'kelas_id',
            type: Sequelize.BIGINT,
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
        freezeTableName: true,
        timestamps: false,
        // tableName: 'siswa',
        underscored: true,
        defaultScope: {
            attributes: { exclude: ['password'] },
        },
        scopes: {
            withPassword: {
                attributes: {},
            }
        }
    });
    return Siswa;
};
exports.default = siswa;
