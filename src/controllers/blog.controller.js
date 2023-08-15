const {
  saveBlogService,
  getBlogsService,
  getOneBlogService,
  updateBlogService,
  deleteBlogService,
  deleteAllBlogsService,
} = require("../services/blog.service");
const { getUserByIdService } = require("../services/user.service");

const uploadFiles = async (req, res) => {
  try {
    const data = {
      success: true,
      url: `http://localhost:3030/file/${req.file.filename}`,
      filename: req.file.filename,
    };

    return await res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      message: "Unexpected error",
      error: error.message,
    });
  }
};

const createBlog = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await getUserByIdService(id);
    if (!user) {
      return res.status(404).json({
        message: `user with _id: ${id} was not found`,
      });
    }
    if (req.file) {
      req.body.image = `http://localhost:3030/file/${req.file.filename}`;
    }
    const newBlog = await saveBlogService({
      title: req.body.title,
      descr: req.body.descr,
      content: req.body.content,
      image: req.body.image,
      blogger: id,
    });

    return res.status(201).json({
      message: "Blog created",
      data: newBlog,
    });
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
    return res.status(500).json({
      message: "Unexpected error",
      error: error.message,
    });
  }
};

const fetchBlogs = async (req, res) => {
  try {
    const blogs = await getBlogsService();

    return res.status(200).json({
      message: "Fetched Blogs",
      data: blogs,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unexpected error",
      error: error.message,
    });
  }
};

const fetchOneBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await getOneBlogService(id);

    return res.status(200).json({
      message: "fetched blog",
      data: blog,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unexpected error",
      error: error.message,
    });
  }
};

const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.file) {
      req.body.image = `http://localhost:3030/file/${req.file.filename}`;
    }

    const blog = await updateBlogService(id, {
      title: req.body.title,
      content: req.body.content,
      image: req.body.image,
    });

    return res.status(200).json({
      message: "Updated blog",
      data: blog,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unexpected error",
      error: error.message,
    });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const res = await deleteBlogService(id);
    return res.status(200).json({
      message: "Deleted blog",
      data: res,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unexpected error",
      error: error.message,
    });
  }
};
const deleteBlogs = async (req, res) => {
  try {
    const data = await deleteAllBlogsService();
    return res.status(200).json({
      message: "deleted all blogs",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unexpected error",
      error: error.message,
    });
  }
};

module.exports = {
  uploadFiles,
  createBlog,
  fetchBlogs,
  fetchOneBlog,
  updateBlog,
  deleteBlog,
  deleteBlogs,
};
