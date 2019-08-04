const { Sequelize, Model } = require('sequelize');
const { sequelize } = require('../../core/db');

class User extends Model {

}

User.init({ // id会自动生成
  nickname: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  openid: { // 更加具体
    type: Sequelize.STRING(64),
    unique: true
  },
}, { 
  sequelize, 
  tableName: 'user' // 表名称
});

module.exports = {
  User
}
