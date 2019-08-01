const { HttpException } =  require('../core/http-exception');
const catchError = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    // console.log(error);
    // ctx.body = "服务器错误";
    if (error instanceof HttpException) { 
      ctx.body = {
        msg: error.msg,
        error_code: error.errorCode,
        request: error.requestUrl
      }
      console.log(error.code);

      // ctx.status = error.code;
      ctx.status = 500;

    } else { // 未知异常
      ctx.body = {
        msg: "we got a mistake.",
        error_code: 999,
        request: `${ctx.method} ${ctx.path}`
      }
      console.log('error', error);
      ctx.status = 500;
    }
  }
}

module.exports = catchError;