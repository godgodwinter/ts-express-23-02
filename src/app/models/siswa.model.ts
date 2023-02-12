const siswa = (sequelize: any, Sequelize: any): any => {
    const Siswa = sequelize.define("siswa", {
        nama: {
            type: Sequelize.STRING,
            allowNull: false
        },
        nomeridentitas: {
            type: Sequelize.STRING,
            allowNull: false
        },
        username: {
            type: Sequelize.STRING,
            allowNull: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: true
        },
        passworddefault: {
            type: Sequelize.STRING,
            allowNull: true
        },
        jk: {
            type: Sequelize.STRING,
            allowNull: true
        },
        telp: {
            type: Sequelize.STRING,
            allowNull: true
        },
        kelas_id: {
            field: 'kelas_id',
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

        freezeTableName: true, // Model tableName will be the same as the model name
        timestamps: false,
        // tableName: 'siswa',
        underscored: true,
        defaultScope: {
            attributes: { exclude: ['password'] },
        },
        scopes: {
            withPassword: {
                attributes: {},
            },
            withoutPass: {
                attributes: { exclude: ['password', 'passworddefault'] },
            }
        }
    });


    return Siswa;
};

export default siswa;