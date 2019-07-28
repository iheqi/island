const HttpException =  require('../core/http-exception');
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
    }
  }
}

module.exports = catchError;