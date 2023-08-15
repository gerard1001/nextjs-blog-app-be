const User = require("../models/user");

const createUserService = async (data) => {
  return await User.create(data);
};

const getUsersService = async () => {
  return await User.find();
};

const getUserByIdService = async (id) => {
  return await User.findById(id);
};

const getUserByNameService = async (name) => {
  return await User.findOne({ userName: name });
};

const deleteUserService = async (id) => {
  return await User.findByIdAndDelete(id);
};

module.exports = {
  createUserService,
  getUsersService,
  getUserByIdService,
  getUserByNameService,
  deleteUserService,
};
