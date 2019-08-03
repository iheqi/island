const Sequelize = require('sequelize');
const {
  dbName,
  user,
  password,
  host,
  port
} = require('../config/config').database;

const sequelize = new Sequelize(dbName, user, password, {
  dialect: 'mysql', // 数据库类型
  host,
  port,
  logging: true, // 打印sequelize操作时对应的sql语句
  timezone: '+08:00', // 设置时区，才会正常显示北京时间
  define: { // 更个性化的参数

  }
});

module.exports = {
  sequelize
}