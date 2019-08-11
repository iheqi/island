const Router = require('koa-router');

const { RegisterValidator } = require('../../validators/validator');
const { User } = require('../../models/user');
const { success } = require('../../lib/helper');

const router = new Router({
  prefix: '/v1/user'
});

router.post('/register', async (ctx) => {
  const v = await new RegisterValidator().validate(ctx);


  const user = {
    nickname: v.get('body.nickname'),
    email: v.get('body.email'),
    password: v.get('body.password2')
  }

  const res = await User.create(user);
  ctx.body = 'success';
});

module.exports = router;