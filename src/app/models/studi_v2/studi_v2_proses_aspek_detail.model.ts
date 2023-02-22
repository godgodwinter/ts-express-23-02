const studi_v2_proses_aspek_detail = (sequelize: any, Sequelize: any): any => {
    const studi_v2_proses_aspek_detail = sequelize.define("studi_v2_proses_aspek_detail", {
        // data
        aspek_detail_nama: {
            type: Sequelize.STRING,
            allowNull: true
        },
        status: {
            type: Sequelize.STRING,
            allowNull: false
        },
        tgl_mulai: {
            type: Sequelize.STRING,
            allowNull: true
        },
        tgl_selesai: {
            type: Sequelize.STRING,
            allowNull: true
        },
        waktu: {
            type: Sequelize.STRING,
            allowNull: true
        },
        // relasi
        studi_v2_proses_id: {
            type: Sequelize.BIGINT,
            allowNull: true
        },
        studi_v2_paketsoal_aspek_detail_id: {
            type: Sequelize.BIGINT,
            allowNull: true
        },
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
            singular: 'studi_v2_proses_aspek_detail',
            plural: 'studi_v2_proses_aspek_detail',
        },
        freezeTableName: true, // Model tableName will be the same as the model name
        timestamps: false,
        tableName: 'studi_v2_proses_aspek_detail',
        underscored: true,
        modelName: 'studi_v2_proses_aspek_detail'

    });

    return studi_v2_proses_aspek_detail;
};

export default studi_v2_proses_aspek_detail;