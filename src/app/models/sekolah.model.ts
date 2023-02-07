const sekolah = (sequelize: any, Sequelize: any): any => {
    const sekolah = sequelize.define("sekolah", {
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
            singular: 'sekolah',
            plural: 'sekolah',
        },
        freezeTableName: true, // Model tableName will be the same as the model name
        timestamps: false,
        tableName: 'sekolah',
        underscored: true,
        modelName: 'sekolah'

    });

    return sekolah;
};

export default sekolah;