const apiprobk_deteksi = (sequelize: any, Sequelize: any): any => {
    const apiprobk_deteksi = sequelize.define("apiprobk_deteksi", {
        apiprobk_id: {
            type: Sequelize.BIGINT,
            allowNull: false
        },
        apiprobk_username: {
            type: Sequelize.STRING,
            allowNull: true
        },
        no_induk: {
            type: Sequelize.BIGINT,
            allowNull: false
        },
        nama: {
            type: Sequelize.STRING,
            allowNull: true
        },
        umur: {
            type: Sequelize.STRING,
            allowNull: true
        },
        jenis_kelamin: {
            type: Sequelize.STRING,
            allowNull: true
        },
        sekolah: {
            type: Sequelize.STRING,
            allowNull: true
        },
        kelas: {
            type: Sequelize.STRING,
            allowNull: true
        },
        deteksi_total_persen: {
            type: Sequelize.FLOAT,
            allowNull: true
        },
        deteksi_total_keterangan: {
            type: Sequelize.STRING,
            allowNull: true
        },
        deteksi_eq_total_persen: {
            type: Sequelize.FLOAT,
            allowNull: true
        },
        deteksi_eq_total_keterangan: {
            type: Sequelize.STRING,
            allowNull: true
        },
        deteksi_sq_total_persen: {
            type: Sequelize.FLOAT,
            allowNull: true
        },
        deteksi_sq_total_keterangan: {
            type: Sequelize.STRING,
            allowNull: true
        },
        deteksi_scq_total_persen: {
            type: Sequelize.FLOAT,
            allowNull: true
        },
        deteksi_scq_total_keterangan: {
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
            singular: 'apiprobk_deteksi',
            plural: 'apiprobk_deteksi',
        },
        freezeTableName: true, // Model tableName will be the same as the model name
        timestamps: false,
        tableName: 'apiprobk_deteksi',
        underscored: true,
        modelName: 'apiprobk_deteksi'

    });


    return apiprobk_deteksi;
};

export default apiprobk_deteksi;