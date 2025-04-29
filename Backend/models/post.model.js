const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Post = sequelize.define(
  "Post",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,       // Si en Oracle es IDENTITY o tienes trigger+sequence
      primaryKey: true,
      allowNull: false,
      field: "ID"
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "AUTHOR"
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "ROLE"
    },
    content: {
      type: DataTypes.STRING(4000),
      allowNull: false,
      field: "CONTENT"
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "IMAGEURL"
    },
    pdfUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "PDFURL"
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: "CREATEDAT"
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: "UPDATEDAT"
    }
  },
  {
    tableName: "POSTS",
    freezeTableName: true,
    timestamps: false    // desactiva la gestión automática de Sequelize
  }
);

module.exports = Post;
