const ujian_paketsoal = (sequelize: any, Sequelize: any): any => {
    const ujian_paketsoal = sequelize.define("ujian_paketsoal", {
        // data
        nama: {
            type: Sequelize.STRING,
            allowNull: true
        },

        // settings
        prefix: {
            type: Sequelize.STRING,
            allowNull: true
        },
        kode: {
            type: Sequelize.STRING,
            allowNull: true
        },
        tgl: {
            type: Sequelize.STRING,
            allowNull: true
        },
        status: {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: "Aktif"
        },
        // relasi

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
            singular: 'ujian_paketsoal',
            plural: 'ujian_paketsoal',
        },
        freezeTableName: true, // Model tableName will be the same as the model name
        timestamps: false,
        tableName: 'ujian_paketsoal',
        underscored: true,
        modelName: 'ujian_paketsoal'

    });

    return ujian_paketsoal;
};

export default ujian_paketsoal;