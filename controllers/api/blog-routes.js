const router = require("express").Router();
const { Blog, User } = require("../../models");
const withAuth = require("../../utils/auth");

//create new blog
router.post("/", withAuth, async (req, res) => {
  try {
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id

    });

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});


//Delete blog 
router.delete("/:id", withAuth, (req, res) => {
  Blog.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbblogData) => {
      if (!dbblogData) {
        res.status(404).json({ message: "No blog found with this id" });
        return;
      }
      res.json(dbblogData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});



module.exports = router;
