'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Store.hasOne(models.Cart, { foreignKey: 'idItem',sourceKey: 'id', as: 'cart' });
    }
  };
  Store.init({
    image: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.STRING(9999),
    price: DataTypes.FLOAT,
    color: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Store',
    timestamps: false,
  });
  return Store;
};
