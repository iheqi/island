const { HttpException } =  require('../core/http-exception');
const catchError = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    if (error instanceof HttpException) { 
      ctx.body = {
        msg: error.msg,
        error_code: error.errorCode,
        request: error.requestUrl
      }
      console.log('这里没捕获到异常并返回？？？');
      // ctx.status = error.code;
      ctx.status = 500;

    } else { // 未知异常
      ctx.body = {
        msg: "we got a mistake.",
        error_code: 999,
        request: `${ctx.method} ${ctx.path}`
      }
      ctx.status = 500;
    }
    // if (global.config.environment === 'dev') {
    //   console.log('error', error);
    // }
    console.log('这里没捕获到异常并返回？？？');

  }
}

module.exports = catchError;