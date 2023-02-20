const kelas = (sequelize: any, Sequelize: any): any => {
    const kelas = sequelize.define("kelas", {
        nama: {
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
            singular: 'kelas',
            plural: 'kelas',
        },
        freezeTableName: true, // Model tableName will be the same as the model name
        timestamps: false,
        tableName: 'kelas',
        underscored: true,
        modelName: 'kelas'

    });

    return kelas;
};

export default kelas;