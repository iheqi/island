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
      ctx.status = error.code;
    } else { // 未知异常
      ctx.body = {
        msg: "we got a mistake.",
        error_code: 999,
        request: `${ctx.method} ${ctx.path}`
      }

      ctx.status = 500;
    }
  }
}

module.exports = catchError;