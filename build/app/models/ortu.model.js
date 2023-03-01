"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ortu = (sequelize, Sequelize) => {
    const ortu = sequelize.define("ortu", {
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
        // tableName: 'ortu',
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
    return ortu;
};
exports.default = ortu;
