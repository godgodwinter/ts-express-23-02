const apiprobk_deteksi_list = (sequelize: any, Sequelize: any): any => {
    const apiprobk_deteksi_list = sequelize.define("apiprobk_deteksi_list", {
        apiprobk_deteksi_id: {
            type: Sequelize.BIGINT,
            allowNull: false
        },
        apiprobk_username: {
            type: Sequelize.STRING,
            allowNull: true
        },
        deteksi_nama: {
            type: Sequelize.STRING,
            allowNull: true
        },
        deteksi_score: {
            type: Sequelize.FLOAT,
            allowNull: true
        },
        deteksi_keterangan: {
            type: Sequelize.STRING,
            allowNull: true
        },
        deteksi_rank: {
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
            singular: 'apiprobk_deteksi_list',
            plural: 'apiprobk_deteksi_list',
        },
        freezeTableName: true, // Model tableName will be the same as the model name
        timestamps: false,
        tableName: 'apiprobk_deteksi_list',
        underscored: true,
        modelName: 'apiprobk_deteksi_list'

    });


    return apiprobk_deteksi_list;
};

export default apiprobk_deteksi_list;