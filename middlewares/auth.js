const basicAuth = require('basic-auth');
const jwt = require('jsonwebtoken');
const { Forbbiden } = require('../core/http-exception');
class Auth {
  constructor(level) {
    this.level = level || 1;
    Auth.USER = 8;
    Auth.ADMIN = 16;
    Auth.SUPER_ADMIN;
  }

  get m() {
    return async (ctx, next) => {
      const userToken = basicAuth(ctx.req);
      console.log('userToken', userToken);

      if (!userToken || !userToken.name) {
        throw new Forbbiden('token不合法');
      }
      let decode = {};
      try {
        decode = jwt.verify(userToken.name, global.config.security.secretKey);
      } catch(err) {
        if (err.name === 'TokenExpiredError') {
          throw new Forbbiden('token已过期');
        }
        throw new Forbbiden('token不合法');
      }

      if (decode.scope < this.level) {
        throw new Forbbiden('权限不足');
      }
      ctx.auth = {
        uid: decode.uid,
        scope: decode.scope
      }
      
      await next();
    }
  }
}

module.exports = {
  Auth
}