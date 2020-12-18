module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("posts", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: Sequelize.DataTypes.STRING,
        defaultValue: false,
        allowNull: false,
      },
      content: {
        type: Sequelize.DataTypes.TEXT,
        defaultValue: false,
        allowNull: false,
      },
      updatedAt: Sequelize.DataTypes.DATE,
      createdAt: Sequelize.DataTypes.DATE,
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("posts");
  },
};
