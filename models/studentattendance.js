'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StudentAttendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  StudentAttendance.init({
    sid: DataTypes.STRING,
    login: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'StudentAttendance',
  });
  return StudentAttendance;
};