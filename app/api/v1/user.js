const Router = require('koa-router');

const { RegisterValidator } = require('../../validators/validator');
const { User } = require('../../models/user');

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

  // console.log(user);
  const res = await User.create(user);
  // console.log(res);
  ctx.body = 'success';
});

module.exports = router;