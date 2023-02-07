const ujian_proses_kelas_siswa_kategori = (sequelize: any, Sequelize: any): any => {
    const ujian_proses_kelas_siswa_kategori = sequelize.define("ujian_proses_kelas_siswa_kategori", {
        // data
        hasil_per_kategori: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        tgl_mulai: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        tgl_selesai: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        waktu: {
            type: Sequelize.STRING,
            allowNull: true,
        },

        // settings
        status: {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: "Aktif"
        },

        // relasi
        ujian_proses_kelas_siswa_id: {
            type: Sequelize.BIGINT,
            allowNull: true
        },
        ujian_paketsoal_kategori_id: {
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
            singular: 'ujian_proses_kelas_siswa_kategori',
            plural: 'ujian_proses_kelas_siswa_kategori',
        },
        freezeTableName: true, // Model tableName will be the same as the model name
        timestamps: false,
        tableName: 'ujian_proses_kelas_siswa_kategori',
        underscored: true,
        modelName: 'ujian_proses_kelas_siswa_kategori'

    });

    return ujian_proses_kelas_siswa_kategori;
};

export default ujian_proses_kelas_siswa_kategori;