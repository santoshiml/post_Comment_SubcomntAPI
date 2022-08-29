'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Comment.belongsTo(models.Wall,{
        foreignKey:'wall_id',
        as:'wall',
      });


      Comment.hasMany(models.Subcomment,{
        foreignKey:'comment_id',
        as:'subcomments'

      })


    }
  }
  Comment.init({
    user_id: DataTypes.INTEGER,
    wall_id: DataTypes.INTEGER,
    comment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};