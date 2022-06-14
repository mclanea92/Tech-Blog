const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');
const {Model, DataTypes} = require('sequelize');

class User extends Model {
    checkPassword(loginPW) {
        return bcrypt.compareSync(loginPW, this.password);
    }
};


User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8, 120]
            }
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        hooks: {
            beforeCreate: async (newUser) => {
                newUser.password = await bcrypt.hash(newUser.password, 7);
                return newUser;
            },
            beforeUpdate: async (updateUser) => {
                if (updateUser.password) {
                    updateUser.password = await bcrypt.hash(updateUser.password, 7)
                }
                return updateUser;
            
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        userscored: true,
        modelName: 'user'
    }
);

module.exports = User;