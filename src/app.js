const express = require("express");
const mongoose = require("mongoose");
const todoRoutes = require("./routes/todo.routes");
const blogRoutes = require("./routes/blog.routes");
const userRoutes = require("./routes/user.routes");
const cors = require("cors");

const port = 3030;

mongoose
  .connect("mongodb://127.0.0.1:27017/test_db", { useNewUrlParser: true })
  .then(() => {
    console.log("DATABASE CONNECTED SUCCESSFULLY ✨✨✨");
  })
  .catch((error) => {
    console.log("FAILED TO CONNECT TO DATABASE 🚫🚫🚫");
  });

const app = express();

app.use("/file", express.static("upload/images"));
app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.use("/api/v1/todo", todoRoutes);
app.use("/api/v1/blog", blogRoutes);
app.use("/api/v1/user", userRoutes);

app.listen(port, () => {
  console.log(`Server up and listening on port ${port}`);
});
