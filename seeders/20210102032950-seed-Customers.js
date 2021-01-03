'use strict';


module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   return queryInterface.bulkInsert('Customers', [{
     identityNumber: '1234567890',
     fullName: 'John Doe',
     address: 'washington',
     birthDate: '2000-01-01',
     gender: 'male',
     createdAt: new Date(),
     updatedAt: new Date()}, 
     {
     identityNumber: '2345678901',
     fullName: 'Jimmy Sky',
     address: 'New Jersey',
     birthDate: '2002-02-02',
     gender: 'male',
     createdAt: new Date(),
     updatedAt: new Date()
     }], {})
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Customers', null, {})
  }
};
