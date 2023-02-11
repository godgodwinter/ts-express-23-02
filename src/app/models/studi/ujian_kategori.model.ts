const ujian_kategori = (sequelize: any, Sequelize: any): any => {
    const ujian_kategori = sequelize.define("ujian_kategori", {
        // data
        nama: {
            type: Sequelize.STRING,
            allowNull: true
        },
        prefix: {
            type: Sequelize.STRING,
            allowNull: true
        },
        // // relasi
        // ujian_kategori_id: {
        //     type: Sequelize.BIGINT,
        //     allowNull: true
        // },

        // timestamp
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
            singular: 'ujian_kategori',
            plural: 'ujian_kategori',
        },
        freezeTableName: true, // Model tableName will be the same as the model name
        timestamps: false,
        tableName: 'ujian_kategori',
        underscored: true,
        modelName: 'ujian_kategori'

    });

    return ujian_kategori;
};

export default ujian_kategori;