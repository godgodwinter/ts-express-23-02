const studi_v2_paketsoal_pilihanjawaban = (sequelize: any, Sequelize: any): any => {
    const studi_v2_paketsoal_pilihanjawaban = sequelize.define("studi_v2_paketsoal_pilihanjawaban", {
        // data
        kode_jawaban: {
            type: Sequelize.STRING,
            allowNull: false
        },
        jawaban: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        skor: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        //relasi
        studi_v2_banksoal_soal_pilihanjawaban_id: {
            type: Sequelize.BIGINT,
            allowNull: true
        },
        studi_v2_paketsoal_soal_id: {
            type: Sequelize.BIGINT,
            allowNull: true
        },
        kode_soal: {
            type: Sequelize.STRING,
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
            singular: 'studi_v2_paketsoal_pilihanjawaban',
            plural: 'studi_v2_paketsoal_pilihanjawaban',
        },
        freezeTableName: true, // Model tableName will be the same as the model name
        timestamps: false,
        tableName: 'studi_v2_paketsoal_pilihanjawaban',
        underscored: true,
        modelName: 'studi_v2_paketsoal_pilihanjawaban',
        scopes: {
            lessData: {
                attributes: { exclude: ['skor'] },
            }
        }

    });

    return studi_v2_paketsoal_pilihanjawaban;
};

export default studi_v2_paketsoal_pilihanjawaban;