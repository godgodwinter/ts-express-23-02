const paket = (sequelize: any, Sequelize: any): any => {
    const paket = sequelize.define("paket", {
        nama: {
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
            singular: 'paket',
            plural: 'paket',
        },
        freezeTableName: true, // Model tableName will be the same as the model name
        timestamps: false,
        tableName: 'paket',
        underscored: true,
        modelName: 'paket'

    });

    return paket;
};

export default paket;