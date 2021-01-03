'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.addColumn('Accounts', 'CustomerId', {
      type : Sequelize.INTEGER,
      reference : {
        model : { tableName: 'Customers'},
        key: 'id'
      },
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
    return queryInterface.removeColumn('Accounts', 'CustomerId')
  }
};
