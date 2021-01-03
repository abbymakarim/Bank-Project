'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Account.belongsTo(models.Customer, {foreignKey: 'CustomerId'})
    }
  };
  Account.init({
    type: DataTypes.STRING,
    balance: {
      type : DataTypes.STRING,
      validate : {
        min : {
          args : [500000],
          msg : 'Minimum balance for new Account: Rp500.000'
        }
      }
    },
    accountNumber: DataTypes.STRING
  }, {
    hooks : {
      beforeCreate(account, options){
        let accountNumberGenerator = Math.random().toString().slice(2,11)
        account.accountNumber = accountNumberGenerator
      },
      beforeValidate(account, options){
        if(account.balance === 0){
          account.balance = 500000
        }
      },
      beforeUpdate(account, options){
        console.log('hi')
        console.log(account.model)
      }
    },
    sequelize,
    modelName: 'Account',
  });
  return Account;
};