'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subcomment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Subcomment.belongsTo(models.Comment,{
        foreignKey:'comment_id',
        as:'comment',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
       
      });


    }
  }
  Subcomment.init({
    user_id: DataTypes.INTEGER,
    comment_id: DataTypes.INTEGER,
    subcomment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Subcomment',
  });
  return Subcomment;
};