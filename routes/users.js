const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const keys = require('../config/keys');
const validateRegisterInput = require('../validations/register');
const validateLoginInput = require('../validations/login');

const User = require('../models/user');

router.post('/register', (req, res) => {

  const {errors, isValid} = validateRegisterInput(req.body);
  if(!isValid){
    return res.status(400).json(errors);
  }

  User.findOne({email: req.body.email})
    .then(user => {
      if(user){
        errors.email = "Email already in use";
        return res.status(400).json(
          errors
        );
      }else{
        const avatar = gravatar.url(req.body.email, {
          s: '200',
          r: 'pg',
          d: 'mm'
        });
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          avatar
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          })
        })
      }
    })
});

router.post('/login', (req, res) => {

  const {errors, isValid} = validateLoginInput(req.body);
  if(!isValid){
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;
  User.findOne({email})
    .then(user => {
      if(!user){
        errors.email = "Email address does not exist"
        return res.status(400).json(errors);
      }else{
        bcrypt.compare(password, user.password)
          .then(isMatch => {
            if(isMatch){
              const payload = {id: user.id, name: user.name, avatar: user.avatar};
              jwt.sign(
                payload,
                keys.secret,
                {expiresIn: 3600},
                (err, token) => {
                    res.json({
                      success: true,
                      token: 'Bearer ' + token
                    })
                  }
              );
            }else{
              errors.password = "Password incorrect";
              res.status(400).json(errors);
            }
          })
      }
    })
});

router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    avatar: req.user.avatar
  });
});

module.exports = router;
