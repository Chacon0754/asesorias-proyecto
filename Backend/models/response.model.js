const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Post = require("./post.model");

const Response = sequelize.define(
  "Response",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true, // ✅ Funciona con GENERATED ALWAYS AS IDENTITY
      field: "ID"
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false, // ❗ Si POST_ID es obligatorio (ajusta si no)
      field: "POST_ID",
      references: {
        model: "POSTS",
        key: "ID"
      }
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
    tableName: "RESPONSES",
    freezeTableName: true,
    timestamps: false // ✅ No se autogeneran createdAt/updatedAt por Sequelize
  }
);

// Relaciones
Post.hasMany(Response, {
  foreignKey: "POST_ID",
  as: "responses"
});

Response.belongsTo(Post, {
  foreignKey: "POST_ID",
  as: "post"
});

module.exports = Response;
