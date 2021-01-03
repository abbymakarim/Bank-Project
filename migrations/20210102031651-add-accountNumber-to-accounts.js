'use strict';


module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.addColumn('Accounts', 'accountNumber', {
      type : Sequelize.STRING,
      onDelete : 'cascade',
      onUpdate : 'cascade'
    })
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.removeColumn('Accounts', 'accountNumber')
  }
};
