const admin = (sequelize: any, Sequelize: any): any => {
    const admin = sequelize.define("users", {
        name: {
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
        // tableName: 'admin',
        underscored: true,
        defaultScope: {
            attributes: { exclude: ['password'] },
        },
        scopes: {
            withPassword: {
                attributes: {},
            }
        }
    });


    return admin;
};

export default admin;