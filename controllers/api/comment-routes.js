
const router = require('express').Router();
const { Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');


// router.get('/', async (req, res) => {

//     try {
//     const allComment = await Comment.findAll({
//         attributes : ["comment", "blog_id", "user_id", "date_created"],
//         include: [
//             {
//               model: User,
//               attributes: ["username", "id"],
//             },
//     }),
//     const comment = allComment.map((comment) => comment.get({ plain: true }));
//     res.render("", {
//       comment,
//       logged_in: req.session.logged_in,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });



router.post('/', withAuth, (req, res) => {
  // check the session
  if (req.session) {
    Comment.create({
      comment_text: req.body.comment_text,
      post_id: req.body.post_id,
      // use the id from the session
      user_id: req.session.user_id,
    })
      .then(dbCommentData => res.json(dbCommentData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  }
});

router.delete('/:id', withAuth, (req, res) => {
    Comment.destroy({
        where: {
          id: req.params.id
        }
      })
        .then(dbCommentData => {
          if (!dbCommentData) {
            res.status(404).json({ message: 'No comment found with this id' });
            return;
          }
          res.json(dbCommentData);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
});

module.exports = router;