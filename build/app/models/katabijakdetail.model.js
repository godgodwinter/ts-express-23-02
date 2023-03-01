"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const katabijakdetail = (sequelize, Sequelize) => {
    const katabijakdetail = sequelize.define("katabijakdetail", {
        penjelasan: {
            type: Sequelize.STRING,
            allowNull: true
        },
        // relasi
        katabijak_id: {
            type: Sequelize.BIGINT,
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
            singular: 'katabijakdetail',
            plural: 'katabijakdetail',
        },
        freezeTableName: true,
        timestamps: false,
        tableName: 'katabijakdetail',
        underscored: true,
        modelName: 'katabijakdetail'
    });
    return katabijakdetail;
};
exports.default = katabijakdetail;
