const ujian_proses = (sequelize: any, Sequelize: any): any => {
    const ujian_proses = sequelize.define("ujian_proses", {
        // data

        // settings
        status: {
            type: Sequelize.STRING,
            allowNull: true
        },
        prefix: {
            type: Sequelize.STRING,
            allowNull: true
        },
        tipe: {
            type: Sequelize.STRING,
            allowNull: true
        },

        tgl: {
            type: Sequelize.STRING,
            allowNull: true
        },
        tgl_akhir: {
            type: Sequelize.STRING,
            allowNull: true
        },

        // relasi
        sekolah_id: {
            type: Sequelize.BIGINT,
            allowNull: true
        },

        // timestamp
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
            singular: 'ujian_proses',
            plural: 'ujian_proses',
        },
        freezeTableName: true, // Model tableName will be the same as the model name
        timestamps: false,
        tableName: 'ujian_proses',
        underscored: true,
        modelName: 'ujian_proses'

    });

    return ujian_proses;
};

export default ujian_proses;