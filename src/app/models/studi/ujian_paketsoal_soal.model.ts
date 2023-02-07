const ujian_paketsoal_soal = (sequelize: any, Sequelize: any): any => {
    const ujian_paketsoal_soal = sequelize.define("ujian_paketsoal_soal", {
        // data
        pertanyaan: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        kode_soal: {
            type: Sequelize.STRING,
            allowNull: true
        },
        kode: {
            type: Sequelize.STRING,
            allowNull: true
        },
        nomer_urut: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        desc: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        // settings
        tipe: {
            type: Sequelize.STRING,
            allowNull: true
        },
        status: {
            type: Sequelize.STRING,
            allowNull: true
        },
        tingkatkesulitan: {
            type: Sequelize.STRING,
            allowNull: true
        },

        // relasi
        ujian_paketsoal_kategori_id: {
            type: Sequelize.BIGINT,
            allowNull: true
        },
        banksoal_id: {
            type: Sequelize.BIGINT,
            allowNull: true
        },

        // timestamp
        deleted_at: {
            field: 'deleted_at',
            type: Sequelize.DATE,
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
            singular: 'ujian_paketsoal_soal',
            plural: 'ujian_paketsoal_soal',
        },
        freezeTableName: true, // Model tableName will be the same as the model name
        timestamps: false,
        tableName: 'ujian_paketsoal_soal',
        underscored: true,
        modelName: 'ujian_paketsoal_soal'

    });

    return ujian_paketsoal_soal;
};

export default ujian_paketsoal_soal;