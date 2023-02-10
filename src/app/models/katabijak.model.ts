const katabijak = (sequelize: any, Sequelize: any): any => {
    const katabijak = sequelize.define("katabijak", {
        judul: {
            type: Sequelize.STRING,
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
            singular: 'katabijak',
            plural: 'katabijak',
        },
        freezeTableName: true, // Model tableName will be the same as the model name
        timestamps: false,
        tableName: 'katabijak',
        underscored: true,
        modelName: 'katabijak'

    });

    return katabijak;
};

export default katabijak;