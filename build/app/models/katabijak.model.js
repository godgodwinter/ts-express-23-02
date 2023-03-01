"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const katabijak = (sequelize, Sequelize) => {
    const katabijak = sequelize.define("katabijak", {
        judul: {
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
            singular: 'katabijak',
            plural: 'katabijak',
        },
        freezeTableName: true,
        timestamps: false,
        tableName: 'katabijak',
        underscored: true,
        modelName: 'katabijak'
    });
    return katabijak;
};
exports.default = katabijak;
