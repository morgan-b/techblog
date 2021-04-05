const router = require("express").Router();
const { Blog, User, Comment } = require("../models");
const withAuth = require('../utils/auth');


// get all posts
router.get("/", withAuth, async (req, res) => {
  try {
    const allBlog = await Blog.findAll({
      where: {
        user_id: req.session.user_id,
    }
    });
        
    
    const blogs = allBlog.map((blog) => blog.get({ plain: true }));
    res.render("dashboard", {

      blogs,
      user_id: req.session.user_id

    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', (req, res) => {
  Blog.update({
    ...req.body
    },
    {
      where: {
        id: req.params.id
      }
    })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id);

    if (blogData) {
      const blog = blogData.get({ plain: true });

      res.render('edit-blog', {
 
        blog,
        logged_in: req.session.logged_in
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.redirect('login');
  }
});



  module.exports = router;