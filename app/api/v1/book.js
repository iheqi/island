const Router = require('koa-router');
const router = new Router();
const { HttpException, ParameterException } = require('../../../core/http-exception');
const { PositiveIntegerValidator } = require('../../validators/validator');

router.post('/v1/:id/book/latest', async (ctx, next) => {
	const v = await new PositiveIntegerValidator().validate(ctx);

	ctx.body = 'success';
	ctx.status = 200;
});

module.exports = router;