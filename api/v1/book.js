const Router = require('koa-router');
const router = new Router();
const HttpException = require('../../core/http-exception');

router.post('/v1/book/latest', (ctx, next) => {
	const path = ctx.params;
	const query = ctx.request.query;
	const headers = ctx.request.header;
	const body = ctx.request.body;

	ctx.body = {
		key: 'book'
	}

	const error = new HttpException('为什么还是报错error', 10001, 400);

	error.requestUrl = `${ctx.method} ${ctx.path}`
	throw error;
});

module.exports = router;