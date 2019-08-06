module.exports = {
  // prod
  environment: 'dev', // 手动改配置，逗我呢？
  database: {
    dbName: 'island',
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '6561846'
  },
  security: {
    secretKey: 'abcdefg', // 可破解jwt
    expiresIn: 60 * 60 // 过期时间
  }
}