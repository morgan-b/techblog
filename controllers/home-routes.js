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

router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const allBlog = await Blog.findAll({
      where: {
        user_id: req.session.user_id,
      }
    });


    const blogs = allBlog.map((blog) => blog.get({ plain: true }));
    res.render("dashboard", {

      blogs,
      user_id: req.session.user_id,
      logged_in: req.session.logged_in

    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/blog/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment', 'blog_id', 'user_id', 'date_created'],
          include: {
            model: User,
            attributes: ['username', 'id']
          }
        },
        {
          model: User,
          attributes: ['username', 'id']
        }
      ]
    })

    if (blogData) {
      const blog = blogData.get({ plain: true });

      res.render('blogpost', {
        blog,
        logged_in: req.session.logged_in
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;