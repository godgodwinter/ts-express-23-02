const studi_v2_paketsoal_aspek_penilaian = (sequelize: any, Sequelize: any): any => {
    const studi_v2_paketsoal_aspek_penilaian = sequelize.define("studi_v2_paketsoal_aspek_penilaian", {
        // RELASI
        studi_v2_paketsoal_aspek_id: {
            type: Sequelize.BIGINT,
            allowNull: true
        },
        studi_v2_paketsoal_aspek_detail_id: {
            type: Sequelize.BIGINT,
            allowNull: true
        },
        studi_v2_paketsoal_id: {
            type: Sequelize.BIGINT,
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
            singular: 'studi_v2_paketsoal_aspek_penilaian',
            plural: 'studi_v2_paketsoal_aspek_penilaian',
        },
        freezeTableName: true, // Model tableName will be the same as the model name
        timestamps: false,
        tableName: 'studi_v2_paketsoal_aspek_penilaian',
        underscored: true,
        modelName: 'studi_v2_paketsoal_aspek_penilaian'

    });

    return studi_v2_paketsoal_aspek_penilaian;
};

export default studi_v2_paketsoal_aspek_penilaian;