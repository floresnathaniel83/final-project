let Router = require('express').Router;
const apiRouter = Router()
let helpers = require('../config/helpers.js')

let User = require('../db/schema.js').User
let Vinyl = require('../db/schema.js').Vinyl

  apiRouter
    .get('/users', function(req, res){
      User.find(req.query , "-password", function(err, results){
        if(err) return res.json(err) 
        res.json(results)
      })
    })

  apiRouter
    .get('/users/:_id', function(req, res){
      User.findById(req.params._id, "-password", function(err, record){
        if(err || !record ) return res.json(err) 
        res.json(record)
      })
    })
    .put('/users/:_id', function(req, res){
      User.findById(req.params._id, "-password",function(err, record){
        if(err || !record) return res.json(err)
        let recordWithUpdates = helpers.updateFields(record, req.body)
        recordWithUpdates.save(function(err){
          if(err) return res.json(err) 
          res.json(recordWithUpdates)
        })
      })
    })
    .delete('/users/:_id', function(req, res){
      User.remove({ _id: req.params._id}, (err) => {
        if(err) return res.json(err)
        res.json({
          msg: `record ${req.params._id} successfully deleted`,
          _id: req.params._id
        })
      })  
    })

    // Routes for a Model(resource) should have this structure
    
    //>>> posts invidual vinyl
    apiRouter.post('/vinyl', function(request, response) {
      let vinyl = new Vinyl(request.body) 
      vinyl.save(function(error) { 
          if(error) {
              response.send(error)
          }
          else {
              response.json(vinyl)
            }
          })
        })
    
    //>>> gets all vinyl posts
    apiRouter.get('/vinyl', function(request, response) {
      Vinyl.find(request.query, function(error, records){  
          if(error) {
              response.send(error)
          }
          else {
              response.json(records)
            }
          })
        })

    //>>> gets vinyl owned by any user
    apiRouter.get('/vinyl/:ownerId', function(request, response) {
      Vinyl.find(request.params, function(error, records){  
          if(error) {
              response.send(error)
          }
          else {
              response.json(records)
            }
          })
        })

    //>>> gets vinyl associated with current user logged in
    apiRouter.get('user/vinyl', function(request, response) {
        Vinyl.find({ownerId: request.user._id}, function(error, records) { 
          if(error) {
              response.send(error)
          }
          else {
              response.json(records)
            }
          })
        })

module.exports = apiRouter