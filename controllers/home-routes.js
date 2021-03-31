const router = require("express").Router();
const { Blog, User, Comment } = require("../models");
const withAuth = require('../utils/auth');


// get all posts
router.get("/", async (req, res) => {
  try {
    const allBlog = await Blog.findAll({
      attributes: ["id", "title", "date_created", "content"],
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    const blogs = allBlog.map((blog) => blog.get({ plain: true }));
    res.render("homepage", {
      blogs,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});



// load login page
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });

//load sign up page
  router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
  
    res.render('signup');
  });

  //get single blog post with comments
router.get("/blog/:id", async (req, res) => {
  try {
    const blogPost = await Blog.findByPk(req.params.id, {

      attributes: ["id", "title", "date_created", "content", "user_id"],
      include: [
        {
          model: User,
          attributes: ["username", "id"],
        },
        { 
        model: Comment, 
        attributes: ["comment", "blog_id", "user_id"] },
      ],
    });

    const blogP = blogPost.get({ plain: true });
    res.render("blogpost", {
      ...blogP,
      logged_in: req.session.logged_in,

    });
  } catch (err) {
    res.status(500).json(err);
  }
});
  module.exports = router;