const studi_v2_banksoal_aspek = (sequelize: any, Sequelize: any): any => {
    const studi_v2_banksoal_aspek = sequelize.define("studi_v2_banksoal_aspek", {
        // data
        nama: {
            type: Sequelize.STRING,
            allowNull: false
        },
        kode: {
            type: Sequelize.STRING,
            allowNull: true
        },
        desc: {
            type: Sequelize.STRING,
            allowNull: true
        },
        status: {
            type: Sequelize.STRING,
            allowNull: true
        },
        tipe: {
            type: Sequelize.STRING,
            allowNull: true
        },
        urutan: {
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
            singular: 'studi_v2_banksoal_aspek',
            plural: 'studi_v2_banksoal_aspek',
        },
        freezeTableName: true, // Model tableName will be the same as the model name
        timestamps: false,
        tableName: 'studi_v2_banksoal_aspek',
        underscored: true,
        modelName: 'studi_v2_banksoal_aspek'

    });

    return studi_v2_banksoal_aspek;
};

export default studi_v2_banksoal_aspek;