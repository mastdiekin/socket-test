const Sequelize = require("sequelize");
const sequelize = require("../db");

const Post = sequelize.define(
  "post",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING,
      defaultValue: false,
      allowNull: false,
    },
    content: {
      type: Sequelize.STRING,
      defaultValue: false,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Post;
