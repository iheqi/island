const Koa = require('koa');
const InitManager = require('./core/init');
const app = new Koa();


InitManager.initCore(app);
console.log('fuck');

app.listen(3000);