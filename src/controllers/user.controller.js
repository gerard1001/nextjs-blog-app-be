const { generateToken } = require("../helpers/jwt.helper");
const {
  createUserService,
  getUserByNameService,
  deleteUserService,
  getUsersService,
} = require("../services/user.service");

const createUser = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = `http://localhost:3030/file/${req.file.filename}`;
    }
    const user = await getUserByNameService(req.body.userName);
    if (user) {
      return res.status(409).json({
        message: "user name is taken",
      });
    }

    const data = await createUserService({
      userName: req.body.userName,
      password: req.body.password,
      image: req.body.image,
    });

    return res.status(201).json({
      message: "created user",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unexpected error",
      error,
    });
  }
};

const login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await getUserByNameService(userName);

    if (!user || password !== user?.password) {
      return res.status(403).json({
        message: "incorrect username or password",
      });
    }
    delete user?.password;
    const token = generateToken({ id: user._id, userName: user.userName });
    return res.status(200).json({
      message: "login successful",
      token,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unexpected error",
      error,
    });
  }
};

const fetchUsers = async (req, res) => {
  try {
    const data = await getUsersService();

    return res.status(200).json({
      message: "fetched users",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unexpected error",
      error,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const res = await deleteUserService(id);
    return res.status(200).json({
      message: "user deleted",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unexpected error",
      error,
    });
  }
};

module.exports = { createUser, login, fetchUsers, deleteUser };
