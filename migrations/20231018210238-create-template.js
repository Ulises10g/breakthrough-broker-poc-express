'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('templates', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      index: {
        type: Sequelize.INTEGER,
      },
      guid: {
        type: Sequelize.STRING
      },
      isActive: {
        type: Sequelize.BOOLEAN
      },
      picture: {
        type: Sequelize.STRING
      },
      width: {
        type: Sequelize.INTEGER
      },
      height: {
        type: Sequelize.INTEGER
      },
      position: {
        type: Sequelize.INTEGER
      },
      scale: {
        type: Sequelize.INTEGER,
        default: 1
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      bgColor: {
        type: Sequelize.STRING,
      },
      childsCount: {
        type: Sequelize.INTEGER,
      },
      templateBaseId: {
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      gender: {
        type: Sequelize.STRING,
      },
      company: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      about: {
        type: Sequelize.STRING,
      },
      registeredBy: {
        type: Sequelize.DATE,
      },
      tags: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('templates');
  }
};