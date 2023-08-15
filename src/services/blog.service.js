const Blog = require("../models/blog");

const saveBlogService = async (data) => {
  return await Blog.create(data);
};

const getBlogsService = async () => {
  return await Blog.find().populate("blogger").exec();
};

const getOneBlogService = async (id) => {
  return await Blog.findById(id).populate("blogger").exec();
};

const updateBlogService = async (id, data) => {
  return await Blog.findByIdAndUpdate(id, data);
};

const deleteBlogService = async (id) => {
  return await Blog.findByIdAndDelete(id);
};

const deleteAllBlogsService = async () => {
  return await Blog.deleteMany();
};

module.exports = {
  saveBlogService,
  getBlogsService,
  getOneBlogService,
  updateBlogService,
  deleteBlogService,
  deleteAllBlogsService,
};
