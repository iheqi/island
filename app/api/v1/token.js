const Router = require('koa-router');
const { TokenValidator, NotEmptyValidator } = require('../../validators/validator');
const { LoginType } = require('../../lib/enum');
const { User } = require('../../models/user');
const { generateToken } = require('../../../core/util');
const { Auth } = require('../../../middlewares/auth');
const { WXManager } = require('../../services/wx');

const router = new Router({
  prefix: '/v1/token'
});

router.post('/', async (ctx) => {
  const v = await new TokenValidator().validate(ctx);
  let token = '';

  switch (v.get('body.type')) {
    case LoginType.USER_EMAIL:
      token = await emailLogin(v.get('body.account'), v.get('body.secret'));
      break;
    case LoginType.USER_MINI_PROGRAM:

      token = await WXManager.codeToToken(v.get('body.account'));
      console.log('token', token);
      break;
    default:
      break;
  }

  ctx.body = {
    token
  };
});

router.post('/verity', async (ctx) => {
  const v = await new NotEmptyValidator().validate(ctx);
  const res = Auth.verifyToken(v.get('body.token'));
  ctx.body = {
    res
  }
});

async function emailLogin(account, secret) {
  const user = await User.verifyEmailPassword(account, secret);
  return generateToken(user.id, Auth.USER);
}
console.log('router', router);
module.exports = router;