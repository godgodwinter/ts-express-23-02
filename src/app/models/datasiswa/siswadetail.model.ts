const siswadetail = (sequelize: any, Sequelize: any): any => {
    const siswadetail = sequelize.define("siswadetail", {
        siswa_id: {
            type: Sequelize.BIGINT,
            allowNull: false
        },
        apiprobk_id: {
            type: Sequelize.BIGINT,
            allowNull: false
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
            singular: 'siswadetail',
            plural: 'siswadetail',
        },
        freezeTableName: true, // Model tableName will be the same as the model name
        timestamps: false,
        tableName: 'siswadetail',
        underscored: true,
        modelName: 'siswadetail'

    });


    return siswadetail;
};

export default siswadetail;