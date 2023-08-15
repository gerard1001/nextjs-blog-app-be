const express = require("express");
const {
  createUser,
  fetchUsers,
  deleteUser,
  login,
} = require("../controllers/user.controller");
const { upload } = require("../helpers/multer.helper");

const router = express.Router();

router.post("/", upload.single("image"), async (req, res) => {
  return await createUser(req, res);
});
router.post("/login", async (req, res) => {
  return await login(req, res);
});
router.get("/", async (req, res) => {
  return await fetchUsers(req, res);
});
router.delete("/:id", async (req, res) => {
  return await deleteUser(req, res);
});

module.exports = router;
