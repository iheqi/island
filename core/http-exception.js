class HttpException extends Error {
  constructor(msg="服务器异常", errorCode=10000, code=400) {
    super();
    this.msg = msg;
    this.errorCode = errorCode;
    // this.code = code;
  }
}

class ParameterException extends HttpException {
  constructor(msg="参数错误", errorCode=10000) {
    super();
    this.msg = msg;
    this.errorCode = errorCode;
  } 
}

class Success extends HttpException { // 把成功也作为一个error抛出，这不太合理吧？
  constructor(msg, errorCode) {
    super();
    this.code = 201;
    this.msg = msg || 'ok';
    this.errorCode = errorCode || 0;
  }
}

class NotFound extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.msg = msg || '资源未找到';
    this.errorCode = errorCode || 10000;
    this.code = 404;
  }
}

class AuthFailed extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.msg = msg || '授权失败';
    this.errorCode = errorCode || 10004;
    this.code = 401;
  }
}

class Forbbiden extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.msg = msg || '禁止访问';
    this.errorCode = errorCode || 10006;
    this.code = 403;
  }
}

module.exports = {
  HttpException,
  ParameterException,
  Success,
  NotFound,
  AuthFailed,
  Forbbiden
};