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
        passworddefault: {
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
        prefix: {
            field: 'prefix',
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
            },
            withoutPass: {
                attributes: { exclude: ['password', 'passworddefault'] },
            }
        }
    });
    return Siswa;
};
exports.default = siswa;
