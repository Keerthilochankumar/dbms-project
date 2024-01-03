'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class faculty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  faculty.init({
    fid: DataTypes.STRING,
    fname: DataTypes.STRING,
    dept: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'faculty',
  });
  return faculty;
};