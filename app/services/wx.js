const util = require('util');
const axios = require('axios');
const { AuthFailed } = require('../../core/http-exception');
const { User } = require('../models/user');
const { generateToken } = require('../../core/util');
const { Auth } = require('../../middlewares/auth');
class WXManager {
  static async codeToToken(code) {
    const url = util.format(global.config.wx.loginUrl, global.config.wx.appId, global.config.wx.appSecret, code);

    console.log(url);
    const res = await axios.get(url);

    console.log('res', res);

    if (res.status !== 200) {
      throw new AuthFailed('获取openid失败');
    }
    if (res.data.errcode !== 0) {
      throw new AuthFailed(`获取openid失败, errcode:${res.data.errcode}`);
    }

    let user = await User.getUserByOpenid(res.data.openid);
    if (!user) {
      user = await User.registerByOpenid(res.data.openid);
    }

    return generateToken(user.id, Auth.USER);
  }
}

module.exports = {
  WXManager
}