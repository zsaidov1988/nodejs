const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Basket } = require('../models/models');

const generateJwt = (id, email, role) => {
  return jwt.sign
  (
    {id, email, role},
    process.env.SECRET_KEY,
    {expiresIn: '24h'} // TTL of token 24 hours
  );
}

class UserController {
  async registration(req, res, next) {
    const {email, password, role} = req.body;
    if (!email || !password) {
      return next(ApiError.badRequest("Email or password is incorrect"));
    }
    const candidate = await User.findOne({where: {email}});
    if (candidate) {
      return next(ApiError.badRequest("User with this email was registered"));
    }
    const hashPassword = await bcrypt.hash(password, 5); // 5 marta heshlash
    const user = await User.create({email, role, password: hashPassword});
    const basket = await Basket.create({userId: user.id});
    const token = generateJwt(user.id, user.email, user.role);
    return res.json({token});
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({where: {email}});
    if (!user) {
      return next(ApiError.internal("Not found user with this email"));
    }
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.internal("Wrong password"));
    }
    const token = generateJwt(user.id, user.email, user.role);
    return res.json({token});
  }

  async check(req, res, next) {
    const token = generateJwt(req.user.id, req.user.email, req.user.role);
    res.json({token});
  }

  async getUser(req, res, next) {
    const { id } = req.params;
    const user = await User.findOne(
      {
        where: {id},
      }
    )
    return res.json(user);
  }

  async getUsers(req, res, next) {

    const users = await User.findAll();
    return res.json(users);
  }
}

module.exports = new UserController();