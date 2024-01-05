'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FACULTYATTENDANCE extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  FACULTYATTENDANCE.init({
    fid: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'FACULTYATTENDANCE',
  });
  return FACULTYATTENDANCE;
};