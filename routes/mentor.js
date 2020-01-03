var express = require('express');
var router = express.Router();
var MentorModel = require('../models/mentor')
var TaskModel = require('../models/task')

var verifyToken = require('../controller/middleware').verifyToken

var mongoose = require('mongoose')

router.post('/', verifyToken, function (req, res) {
  let data = req.body
  data.admin = req.user._id
  new MentorModel(data).save(function (err, created) {
    if (!err && created) {
      res.status(200).json({
        result: created
      })
    } else {
      res.status(400).json({
        error: err || 'something went wrong !'
      })
    }
  })
})

router.get('/all', verifyToken, function (req, res) {
  MentorModel.find({
    'admin': mongoose.Types.ObjectId(req.user._id)
  }).exec(function (err, mentors) {
    if (!err && mentors) {
      res.status(200).json({
        result: mentors
      })
    } else {
      res.status(400).json({
        error: err || 'something went wrong'
      })
    }
  })
})

router.get('/', verifyToken, function (req, res) {
  MentorModel.findOne({
    _id: mongoose.Types.ObjectId(req.query.mentor)
  }).exec(function (err, mentor) {
    if (!err && mentor) {
      res.status(200).json({
        result: mentor
      })
    } else {
      res.status(400).json({
        error: err || 'something went wrong'
      })
    }
  })
})

router.put('/', verifyToken, function (req, res) {
  MentorModel.findOneAndUpdate({
    _id: mongoose.Types.ObjectId(req.body._id)
  }, {
    name: req.body.name
  }, {
    new: true
  }).exec(function (err, mentor) {
    if (!err && mentor) {
      res.status(200).json({
        result: mentor
      })
    } else {
      res.status(400).json({
        error: err || 'something went wrong'
      })
    }
  })
})

router.delete('/', verifyToken, function (req, res) {
  MentorModel.findOneAndRemove({
    _id: mongoose.Types.ObjectId(req.query.mentor)
  }).exec(function (err, mentor) {
    if (!err && mentor) {
      res.status(200).json({
        result: mentor
      })
    } else {
      res.status(400).json({
        error: err || 'something went wrong'
      })
    }
  })
})

router.post('/task', verifyToken, function (req, res) {
  let data = req.body
  data.admin = req.user._id
  new TaskModel(data).save(function (err, created) {
    if (!err && created) {
      res.status(200).json({
        result: created
      })
    } else {
      res.status(400).json({
        error: err || 'something went wrong !'
      })
    }
  })
})

router.get('/task/all', verifyToken, function (req, res) {
  let filter = {
    'admin': mongoose.Types.ObjectId(req.user._id)
  }
  if(req.query.mentor){
    filter.mentor = mongoose.Types.ObjectId(req.query.mentor)
  }
  TaskModel.find(filter).exec(function (err, tasks) {
    if (!err && tasks) {
      res.status(200).json({
        result: tasks
      })
    } else {
      res.status(400).json({
        error: err || 'something went wrong'
      })
    }
  })
})

router.get('/task', verifyToken, function (req, res) {
  TaskModel.findOne({
    _id: mongoose.Types.ObjectId(req.query.task)
  }).exec(function (err, task) {
    if (!err && task) {
      res.status(200).json({
        result: task
      })
    } else {
      res.status(400).json({
        error: err || 'something went wrong'
      })
    }
  })
})

router.put('/task', verifyToken, function (req, res) {
  TaskModel.findOneAndUpdate({
    _id: mongoose.Types.ObjectId(req.body._id)
  }, {
    name: req.body.name,
    description: req.body.description
  }, {
    new: true
  }).exec(function (err, task) {
    if (!err && task) {
      res.status(200).json({
        result: task
      })
    } else {
      res.status(400).json({
        error: err || 'something went wrong'
      })
    }
  })
})

router.delete('/task', verifyToken, function (req, res) {
  TaskModel.findOneAndRemove({
    _id: mongoose.Types.ObjectId(req.query.task)
  }).exec(function (err, task) {
    if (!err && task) {
      res.status(200).json({
        result: task
      })
    } else {
      res.status(400).json({
        error: err || 'something went wrong'
      })
    }
  })
})

module.exports = router;
