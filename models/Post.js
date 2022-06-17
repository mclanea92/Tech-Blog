const sequelize = require('../config/connection')

const {Model, DataTypes} = require('sequelize');
const { INTEGER } = require('sequelize');
class Post extends Model {}

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,  
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        user_id: {
            type: INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'post'
    }
);


module.exports = Post;