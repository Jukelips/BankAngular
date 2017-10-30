/**
 * Created by Adrien on 30/10/2017.
 */
// const express = express();
// const router  = express.Router();
const User = require('/src/schema/User');

router.post('/register', function (err, req, res, next) {
  console.log('coucou : ' + req.body.password);
  // confirm that user typed same password twice
  if (req.body.password !== req.body.passwordConf) {
    res.status(400).send('Current password does not match');
    return next(err);
  }

  if (req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.passwordConf) {

    const userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      passwordConf: req.body.passwordConf
    };

    User.create(userData, function (error, user) {
      if (error) {
        return next(error);
      } else {
        req.session.userId = user._id;
        return res.redirect('/login'); // /profile
      }
    });

  } else if (req.body.logemail && req.body.logpassword) {
    User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
      if (error || !user) {
        err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.redirect('/login'); // /profile
      }
    });
  } else {
    err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
});

// GET for logout logout
router.get('/logout', function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/login');
      }
    });
  }
});
