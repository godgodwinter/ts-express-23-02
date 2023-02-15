const studi_v2_hasil_aspek = (sequelize: any, Sequelize: any): any => {
    const studi_v2_hasil_aspek = sequelize.define("studi_v2_hasil_aspek", {
        // data
        urutan: {
            type: Sequelize.BIGINT,
            allowNull: true
        },
        aspek_nama: {
            type: Sequelize.STRING,
            allowNull: false
        },
        nilaiAkhir: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        status: {
            type: Sequelize.STRING,
            allowNull: false
        },

        //relasi
        studi_v2_hasil_id: {
            type: Sequelize.BIGINT,
            allowNull: false
        },
        studi_v2_paketsoal_aspek_id: {
            type: Sequelize.BIGINT,
            allowNull: false
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
            singular: 'studi_v2_hasil_aspek',
            plural: 'studi_v2_hasil_aspek',
        },
        freezeTableName: true, // Model tableName will be the same as the model name
        timestamps: false,
        tableName: 'studi_v2_hasil_aspek',
        underscored: true,
        modelName: 'studi_v2_hasil_aspek'

    });

    return studi_v2_hasil_aspek;
};

export default studi_v2_hasil_aspek;