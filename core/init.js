const Router = require('koa-router');
const requireDirectory = require('require-directory');

class InitManager {
  static initCore(app) {
    InitManager.app = app;
    InitManager.initLoadRouters();
  }

  static initLoadRouters() {
    const whenLoadModule = (obj) => {
      if (obj instanceof Router) {
        InitManager.app.use(obj.routes());
      }
    }
    
    requireDirectory(module, '../app/api', { visit: whenLoadModule });
  }
}

module.exports = InitManager;