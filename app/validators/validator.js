const { LinValidator, Rule } = require('../../core/lin-validator-v2');
const { User } = require('../models/user');
const { LoginType } = require('../lib/enum');
class PositiveIntegerValidator extends LinValidator {
  constructor() {
      super();
      this.id = [
          new Rule('isInt', '需要是正整数', {
              min: 1
          }),
      ];
  }
}

class RegisterValidator extends LinValidator {
  constructor() {
    super();
    this.email = [
      new Rule('isEmail', '不符合email规范')
    ];

    this.password1 = [
      new Rule('isLength', '密码至少6个字符，至多32个字符', {
        min: 6,
        max: 32
      }),

      // new Rule('matches', '')
    ];

    this.password2 = this.password1;
    this.nickname = [
      new Rule('isLength', '昵称不符合长度规范', {
        min: 4,
        max: 32
      })
    ];
  }

  validatePassword(vals) { // 自定义的校验
    if (vals.body.password1 !== vals.body.password2) {
      throw new Error('两个密码必须相同');
    };
  }

  async validateEmail(vals) {
    const email = vals.body.email;
    const user = await User.findOne({ // 数据库查询
      where: {
        email: email
      }
    });
    if (user) {
      throw new Error('email不可以重复');
    }
  }
}

class TokenValidator extends LinValidator {
  constructor() {
    super();
    this.account = [
      new Rule('isLength', '不符合帐号规则', {
        min: 4,
        max: 32
      })
    ];

    this.secret = [ // 密码可以不传，如你在微信中打开小程序，那微信这个母体已经验证过你了，就只需要传送帐号即可。
      new Rule('isOptional'),
      new Rule('isLength', '最小6个字符',{
        min: 6,
        max: 128
      })
    ]; 
  }

  validateLoginType(vals) {
    if (!vals.body.type) {
      throw new Error('type是必须参数');
    }

    if (!LoginType.isThisType(vals.body.type)) {
      throw new Error('type参数不合法');
    }
  }
}

module.exports = {
  PositiveIntegerValidator,
  RegisterValidator,
  TokenValidator
};