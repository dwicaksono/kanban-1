'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  class Task extends Model { }
  Task.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'column cannot be empty' },
        notEmpty: { args: true, msg: 'column cannot be empty' }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'column cannot be empty' },
        notEmpty: { args: true, msg: 'column cannot be empty' }
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'column cannot be empty' },
        notEmpty: { msg: 'column cannot be empty' },
        isIn: {
          args: [['Low', 'Medium', 'Hight']],
          msg: 'status not found'
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'column cannot be empty' },
        notEmpty: { msg: 'column cannot be empty' },
        isIn: {
          args: [['Backlog', 'Todo', 'Completed', 'Done']],
          msg: 'status not found'
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, { sequelize })

  // const Task = sequelize.define('Task', {
  //   title: DataTypes.STRING,
  //   description: DataTypes.STRING,
  //   status: DataTypes.STRING,
  //   category: DataTypes.STRING,
  //   UserId: DataTypes.INTEGER
  // }, {});
  Task.associate = function (models) {
    // associations can be defined here
    Task.belongsTo(models.User)
  };
  return Task;
};