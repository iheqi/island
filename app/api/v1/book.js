const Router = require('koa-router');
const router = new Router();
const { HttpException, ParameterException } = require('../../../core/http-exception');
const { PositiveIntegerValidator } = require('../../validators/validator');

router.post('/v1/:id/book/latest', (ctx, next) => {
	const path = ctx.params;
	const query = ctx.request.query;
	const headers = ctx.request.header;
	const body = ctx.request.body;

	const v = new PositiveIntegerValidator().validate(ctx);

	ctx.body = 'success';
	ctx.status = 200;
});

module.exports = router;