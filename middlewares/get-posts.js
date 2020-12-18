const Post = require("../models/Post");

module.exports.getPosts = async () => {
  return await Post.findAll()
    .then((posts) => posts)
    .catch((err) => console.log(err));
};
