// 数据库user表

const bcrypt = require('bcryptjs')
const { Sequelize, Model } = require('sequelize');
const { sequelize } = require('../../core/db');
const { NotFound, AuthFailed } = require('../../core/http-exception');

class User extends Model {
  static async verifyEmailPassword(email, plainPassword) {
    const user = await User.findOne({
      where: {
        email
      }
    });

    if (!user) {
      throw new AuthFailed('帐号不存在');
    }

    console.log('user.password', user.password);

    const flag = bcrypt.compareSync(plainPassword, user.password); // plainPassword自动加盐后hash和user.password对比？没有根据用户名怎么知道是哪个salt？还是说salt拼接在user.password中？

    if (!flag) {
      throw new AuthFailed('密码不正确');
    }
    return user;
  }
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
