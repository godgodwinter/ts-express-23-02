const katabijakdetail = (sequelize: any, Sequelize: any): any => {
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
        freezeTableName: true, // Model tableName will be the same as the model name
        timestamps: false,
        tableName: 'katabijakdetail',
        underscored: true,
        modelName: 'katabijakdetail'

    });

    return katabijakdetail;
};

export default katabijakdetail;