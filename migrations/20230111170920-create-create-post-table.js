'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CreatePostTables', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        type: Sequelize.INTEGER
      },
      Gmail: {
        type: Sequelize.STRING
      },
      Date: {
        type: Sequelize.INTEGER
      },
      Time: {
        type: Sequelize.INTEGER
      },
      Text: {
        type: Sequelize.STRING
      },
      Discription: {
        type: Sequelize.STRING
      }
      // ,
      // createdAt: {
      //   allowNull: false,
      //   type: Sequelize.DATE
      // },
      // updatedAt: {
      //   allowNull: false,
      //   type: Sequelize.DATE
      // }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('CreatePostTables');
  }
};
