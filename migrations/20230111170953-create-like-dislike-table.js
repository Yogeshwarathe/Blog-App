'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('LikeDislikeTables', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        type: Sequelize.INTEGER
      },
      PostId: {
        type: Sequelize.INTEGER
      },
      Gmail: {
        type: Sequelize.STRING
      },
      Like: {
        type: Sequelize.INTEGER
      },
      Dislike: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('LikeDislikeTables');
  }
};
