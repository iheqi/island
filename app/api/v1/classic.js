const Router = require('koa-router');
const { Auth } =  require('../../../middlewares/auth');
const { PositiveIntegerValidator } = require('../../validators/validator');
const Flow = require('../../models/flow');
const Art = require('../../models/art');

const router = new Router({
	prefix: '/v1/classic'
});


router.get('/latest', new Auth(8).m, async (ctx, next) => {
	const flow = await Flow.findOne({
		order: [
			['index', 'DESC']
		]
	});
	const art = await Art.getData(flow.art_id, flow.type);
	// art.index = flow.index;
	// console.log(art, flow);
	art.setDataValue('index', flow.index);
	ctx.body = art;
});

module.exports = router;
