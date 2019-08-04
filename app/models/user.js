const bcrypt = require('bcryptjs')
const { Sequelize, Model } = require('sequelize');
const { sequelize } = require('../../core/db');

class User extends Model {

}

User.init({ // id会自动生成
  nickname: Sequelize.STRING,
  email: Sequelize.STRING,
  password: {
    type: Sequelize.STRING,
    set(val) { // 对password赋值时调用
      const salt = bcrypt.genSaltSync(10); // 数字可以理解为破解难度
      const psw = bcrypt.hashSync(val, salt);
      this.setDataValue('password', psw);
    }
  },
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
