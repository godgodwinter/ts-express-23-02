const studi_v2_proses_aspek_detail_soal_pilihan_jawaban = (sequelize: any, Sequelize: any): any => {
    const studi_v2_proses_aspek_detail_soal_pilihan_jawaban = sequelize.define("studi_v2_proses_aspek_detail_soal_pilihan_jawaban", {
        // data
        pilihanjawaban_jawaban: {
            type: Sequelize.STRING,
            allowNull: true
        },
        pilihanjawaban_skor: {
            type: Sequelize.BIGINT,
            allowNull: true
        },
        kode_jawaban: {
            type: Sequelize.STRING,
            allowNull: false
        },
        // RELASI
        studi_v2_proses_aspek_detail_soal_id: {
            type: Sequelize.BIGINT,
            allowNull: true
        },
        studi_v2_paketsoal_pilihanjawaban_id: {
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
            singular: 'studi_v2_proses_aspek_detail_soal_pilihan_jawaban',
            plural: 'studi_v2_proses_aspek_detail_soal_pilihan_jawaban',
        },
        freezeTableName: true, // Model tableName will be the same as the model name
        timestamps: false,
        tableName: 'studi_v2_proses_aspek_detail_soal_pilihan_jawaban',
        underscored: true,
        modelName: 'studi_v2_proses_aspek_detail_soal_pilihan_jawaban',
        scopes: {
            lessData: {
                attributes: { exclude: ['pilihanjawaban_skor'] },
            }
        }

    });

    return studi_v2_proses_aspek_detail_soal_pilihan_jawaban;
};

export default studi_v2_proses_aspek_detail_soal_pilihan_jawaban;