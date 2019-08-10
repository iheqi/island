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
  },
  wx: {
    appId: 'wx6cbf2dc93ad4921a',
    appSecret: '06753b7cafc67da4b728abb834f729d3',
    loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
  },
}