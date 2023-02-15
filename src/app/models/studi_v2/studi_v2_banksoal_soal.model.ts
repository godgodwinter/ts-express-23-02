const studi_v2_banksoal_soal = (sequelize: any, Sequelize: any): any => {
    const studi_v2_banksoal_soal = sequelize.define("studi_v2_banksoal_soal", {
        // data
        pertanyaan: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        tipe: {
            type: Sequelize.STRING,
            allowNull: true
        },
        kode_soal: {
            type: Sequelize.STRING,
            allowNull: true
        },
        status: {
            type: Sequelize.STRING,
            allowNull: true
        },
        tingkatkesulitan: {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: "Sedang"
        },
        kode: {
            type: Sequelize.STRING,
            allowNull: true
        },
        nomer_urut: {
            type: Sequelize.BIGINT,
            allowNull: true
        },
        desc: {
            type: Sequelize.STRING,
            allowNull: true
        },
        aspek_nama: {
            type: Sequelize.STRING,
            allowNull: true
        },
        aspek_detail_nama: {
            type: Sequelize.STRING,
            allowNull: true
        },
        // relasi
        studi_v2_banksoal_aspek_detail_id: {
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
            singular: 'studi_v2_banksoal_soal',
            plural: 'studi_v2_banksoal_soal',
        },
        freezeTableName: true, // Model tableName will be the same as the model name
        timestamps: false,
        tableName: 'studi_v2_banksoal_soal',
        underscored: true,
        modelName: 'studi_v2_banksoal_soal'

    });

    return studi_v2_banksoal_soal;
};

export default studi_v2_banksoal_soal;