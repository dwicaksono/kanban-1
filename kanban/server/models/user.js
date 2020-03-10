const createErrors = require('http-errors')
'use strict';
const { hashingPassword, verifyingPassword } = require('../helper/bcrypt')
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  class User extends Model { }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: { args: true, msg: 'column cannot be empty' },
        notEmpty: { args: true, msg: 'column cannot be empty' }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: { args: true, msg: 'column cannot be empty' },
        notEmpty: { args: true, msg: 'column cannot be empty' },
        isEmailUniq(value) {
          return User.findOne({ where: { email: value } })
            .then(resultEmail => {
              if (resultEmail) {
                throw createErrors('400', 'email is already in use')
              }
            })
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Please fill in all fields' },
        notEmpty: { msg: 'Please fill in all fields' },
        len: {
          args: 5,
          msg: 'Password must be at least 5 characters'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        user.password = hashingPassword(user.password)
      }
    },
    sequelize
  })
  // const User = sequelize.define('User', {
  //   username: DataTypes.STRING,
  //   email: DataTypes.STRING,
  //   password: DataTypes.STRING
  // }, {});
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Task)
  };
  return User;
};