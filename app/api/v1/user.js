const Router = require('koa-router');
const bcrypt = require('bcryptjs')

const { RegisterValidator } = require('../../validators/validator');
const { User } = require('../../models/user');

const router = new Router({
  prefix: '/v1/user'
});

router.post('/register', async (ctx) => {
  const v = await new RegisterValidator().validate(ctx);
  const salt = bcrypt.genSaltSync(10); // 数字可以理解为破解难度
  const psw = bcrypt.hashSync(v.get('body.password1'), salt);

  const user = {
    nickname: v.get('body.nickname'),
    email: v.get('body.email'),
    password: psw
  }

  // console.log(user);
  const res = await User.create(user);
  // console.log(res);
  ctx.body = 'success';
});

module.exports = router;