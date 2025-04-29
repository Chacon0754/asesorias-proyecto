const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Post = require('./post.model');
const Response = sequelize.define('Response', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    postId: {
        type: DataTypes.INTEGER,
        references: {
            model: Post,
            key: 'id'
        }
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true
    },
    pdfUrl: {
        type: DataTypes.STRING,
        allowNull: true
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }

});

Post.hasMany(Response, { foreignKey: 'postId' });
Response.belongsTo(Post, { foreignKey: 'postId' });

module.exports = Response;