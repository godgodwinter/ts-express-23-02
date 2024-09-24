const gurubk = (sequelize: any, Sequelize: any): any => {
    const Gurubk = sequelize.define("gurubk", {
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
        sekolah_id: {
            field: 'sekolah_id',
            type: Sequelize.BIGINT,
            allowNull: true
        },
        prefix: {
            field: 'prefix',
            type: Sequelize.STRING,
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


    return Gurubk;
};

export default gurubk;