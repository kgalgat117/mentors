var express = require('express');
var router = express.Router();
var UserModel = require('./../models/user')


const jwt = require('jsonwebtoken')
var mongoose = require('mongoose')
var bcrypt = require('bcrypt');


const saltRounds = 10;
const secretKey = 'Happier';

router.post('/signup', function (req, res) {
  bcrypt.genSalt(saltRounds, function (err, salt) {
    if (err) {
      res.status(400).json({
        error: 'Something goes wrong'
      })
    } else {
  bcrypt.hash(req.body.password, salt).then(function (hash) {
  req.body.password = hash
  let data = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
    password: req.body.password
  }
  let dataUpdate = new UserModel(data)
  dataUpdate.save(function (err, createdUser) {
    if (!err && createdUser) {
      res.status(200).send(createdUser)
    } else {
      res.status(400).send(err || {
        error: 'something went wrong'
      })
    }
  })
      }).catch(err => {
        res.status(400).json({
          error: err || 'something went wrong'
        })
      })
    }
  })
})

router.post('/signin', function (req, res) {
  let data = {
    email: req.body.email,
    password: req.body.password
  }
  UserModel.findOne(data)
    .exec(function (err, foundUser) {
      if (!err && foundUser) {
        bcrypt.compare(req.body.password, foundUser.password, function (err, resp) {
          if (err) {
            res.status(400).json({
              error: err
            })
          } else {
            if (resp == true) {
        let payload = {
          user: foundUser._id
        }
        let token = jwt.sign(payload, secretKey, {
          expiresIn: '2h'
        })
        res.status(200).json({
          user: foundUser,
          token: token
        })
      } else {
        res.status(400).json({
          error: 'password incorrect or email'
        })
            }
          }
        })
        } else {
        if (err) {
          res.status(400).send(err || {
            error: 'something went wrong'
          })
        } else {
          res.status(404).send({
            error: 'User not found'
          })
        }
      }
    })
})

module.exports = router;

