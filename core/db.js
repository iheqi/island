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
    timestamps: true,
    paranoid: true, // 不从数据库中删除数据，而只是增加一个 deletedAt 标识当前时间,paranoid 属性只在启用 timestamps 时适用
    underscored: true, // 不使用驼峰式命令规则，这样会在使用下划线分隔
  }
});

sequelize.sync({ force: false }); // 通过 sync 方法同步数据结构，设置为true会删除并重建表

module.exports = {
  sequelize
}