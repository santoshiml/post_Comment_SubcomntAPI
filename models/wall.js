'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Wall extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Wall.belongsTo(models.User,{
        foreignKey:'user_id',
        as:'users'
      });

      Wall.hasMany(models.Comment, {
        as:'comments', 
        foreignKey:'wall_id'
      });


    }
  }
  Wall.init({
    user_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Wall',
  });
  return Wall;
};