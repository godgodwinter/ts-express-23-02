const ujian_banksoal_aspek = (sequelize: any, Sequelize: any): any => {
    const ujian_banksoal_aspek = sequelize.define("ujian_banksoal_aspek", {
        // data
        nama: {
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
        // settings
        // relasi

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
            singular: 'ujian_banksoal_aspek',
            plural: 'ujian_banksoal_aspek',
        },
        freezeTableName: true, // Model tableName will be the same as the model name
        timestamps: false,
        tableName: 'ujian_banksoal_aspek',
        underscored: true,
        modelName: 'ujian_banksoal_aspek'

    });

    return ujian_banksoal_aspek;
};

export default ujian_banksoal_aspek;