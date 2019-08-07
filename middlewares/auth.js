const basicAuth = require('basic-auth');
const jwt = require('jsonwebtoken');
const { Forbbiden } = require('../core/http-exception');
class Auth {
  constructor() {

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