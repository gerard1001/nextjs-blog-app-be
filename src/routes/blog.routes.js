const express = require("express");
const {
  createBlog,
  fetchBlogs,
  fetchOneBlog,
  updateBlog,
  deleteBlog,
  deleteBlogs,
  uploadFiles,
} = require("../controllers/blog.controller");
const { upload } = require("../helpers/multer.helper");
const { checkLoggedIn } = require("../middlewares/authenticate");

const router = express.Router();

router.post("/files", upload.single("file"), async (req, res) => {
  return await uploadFiles(req, res);
});

router.post("/", checkLoggedIn, upload.single("image"), async (req, res) => {
  return await createBlog(req, res);
});

router.get("/", async (req, res) => {
  return await fetchBlogs(req, res);
});

router.get("/:id", async (req, res) => {
  return await fetchOneBlog(req, res);
});

router.patch("/:id", upload.single("image"), async (req, res) => {
  return await updateBlog(req, res);
});

router.delete("/:id", async (req, res) => {
  return await deleteBlog(req, res);
});

router.delete("/", async (req, res) => {
  return await deleteBlogs(req, res);
});

module.exports = router;
