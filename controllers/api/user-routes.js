const router = require('express').Router();
const { User } = require('../../models');


router.get('/', async (req, res) => {
  try { const allUsers = await User.findAll({
    
  })
  res.status(200).json(allUsers);
}
catch (err) {
  console.log(err);
  res.status(500).json(err);
}
})

//create a new user
router.post('/', async (req, res) => {
    try {
      const dbUserData = await User.create({
        username: req.body.username,
        password: req.body.password,
      });
  
      req.session.save(() => {
        
        req.session.logged_in = true;
        req.session.user_id= dbUserData.id
  
        res.status(200).json(dbUserData);
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  
// Login
router.post('/login', async (req, res) => {
  try {
    // TODO: Add a comment describing the functionality of this expression
    const userData = await User.findOne({ where: { username: req.body.username } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username, please try again' });
      return;
    }

    // TODO: Add a comment describing the functionality of this expression
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // TODO: Add a comment describing the functionality of this method
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});


//Logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    // TODO: Add a comment describing the functionality of this method
    req.session.destroy(() => {
      res.status(204).end();
    
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
