const { Comment } = require('../models');

const commentData = 

[
    {
      "comment": "This is amazing!",
      "blog_id": 1,
      "user_id":2,
    },
    {
        "comment": "No way!",
        "blog_id": 2,
        "user_id":3,
      },
      {
        "comment": "I love data too!",
        "blog_id": 3,
        "user_id":4,
      },
      ]

  const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;