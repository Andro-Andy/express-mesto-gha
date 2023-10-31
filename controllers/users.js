const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const NotFoundError = require('../errors/NotFoundError');
const Unauthorized = require('../errors/Unauthorized');

const User = require('../models/user');
const {
  CODE,
  CODE_CREATED,
  NOT_FOUND_ERROR,
} = require('../utils/constants');

const checkUser = (user, res, next) => {
  if (user) {
    return res.send({ data: user });
  }
  const error = new NotFoundError(`Пользователь по указанному _id не найден ${NOT_FOUND_ERROR}`);
  return next(error);
};

const createUser = async (req, res, next) => {
  try {
    const {
      name,
      about,
      avatar,
      email,
      password,
    } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    });
    res.status(CODE_CREATED).send({ data: user });
  } catch (error) {
    next(error);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(CODE).send(users);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    checkUser(user, res);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
      runValidators: true,
    });
    checkUser(updatedUser, res);
  } catch (error) {
    next(error);
  }
};

// eslint-disable-next-line no-unused-vars
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findUserByCredentials(email, password);
    const token = jwt.sign(
      { _id: user._id },
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
      { expiresIn: '7d' },
    );
    res
      .cookie('token', token, {
        maxAge: 3600000,
        httpOnly: true,
        sameSite: true,
      }).send({ token });
  } catch (err) {
    const unauthorizedError = new Unauthorized(err.message);
    next(unauthorizedError);
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  login,
};
