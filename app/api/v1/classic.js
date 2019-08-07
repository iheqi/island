const Router = require('koa-router');
const { Auth } =  require('../../../middlewares/auth');
const { PositiveIntegerValidator } = require('../../validators/validator');

const router = new Router({
	prefix: '/v1/classic'
});


router.get('/latest', new Auth(9).m, (ctx, next) => {
	ctx.body = ctx.auth.uid;
});

module.exports = router;
