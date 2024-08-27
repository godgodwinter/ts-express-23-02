const sekolah = (sequelize: any, Sequelize: any): any => {
    const sekolah = sequelize.define("sekolah", {
        nama: {
            type: Sequelize.STRING,
            allowNull: true
        },
        status: {
            type: Sequelize.STRING,
            allowNull: true
        },
        kepsek_nama: {
            field: 'kepsek_nama',
            type: Sequelize.STRING,
            allowNull: true
        },
        tahunajaran_nama: {
            field: 'tahunajaran_nama',
            type: Sequelize.STRING,
            allowNull: true
        },
        semester_nama: {
            field: 'semester_nama',
            type: Sequelize.STRING,
            allowNull: true
        },
        kecamatan: {
            type: Sequelize.STRING,
            allowNull: true
        },
        kabupaten: {
            type: Sequelize.STRING,
            allowNull: true
        },
        provinsi: {
            type: Sequelize.STRING,
            allowNull: true
        },
        // relasi
        paket_id: {
            type: Sequelize.BIGINT,
            allowNull: true
        },
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
            singular: 'sekolah',
            plural: 'sekolah',
        },
        freezeTableName: true, // Model tableName will be the same as the model name
        timestamps: true,
        tableName: 'sekolah',
        underscored: true,
        modelName: 'sekolah'

    });

    return sekolah;
};

export default sekolah;