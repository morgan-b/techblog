const { Blog } = require('../models');

const blogData = 

[
    {
      "title": "Really Cool Tech",
      "content": "There is some really cool tech that has been released",
      "user_id":1,
    },
    {
        "title": "Some Other Awesome Tech",
        "content": "There is some really cool tech that has been released",
        "user_id":2,
      },
      {
        "title": "Do You Like Data?",
        "content": "Same! This data is really cool",
        "user_id":3,
      },
      ]

  const seedBlog = () => Blog.bulkCreate(blogData);

module.exports = seedBlog;