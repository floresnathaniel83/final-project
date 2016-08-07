
let Router = require('express').Router;
const apiRouter = Router()
let helpers = require('../config/helpers.js')

let User = require('../db/schema.js').User
let Vinyl = require('../db/schema.js').Vinyl
let Trade = require('../db/schema.js').Trade

//USER SERVER ROUTES
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
      //VINYL SERVER ROUTES
    //>>> posts individual vinyl
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

    //READ MANY
    // //>>> gets vinyl owned by any user. 
    //  will read /vinyl?ownerId=123 
    // and store {ownerId: 123} under request.query
  
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

    // READ ONE
    // >>> gets just a single vinyl with a unique _id
    // what pattern will it match?
    // vinyl/123
    // how will it store the vinyl id?
    // request.params becomes an object: {vinylId : 123}
      apiRouter.get('/vinyl/:vinylId', function(request, response) {
        Vinyl.findById(request.params.vinylId, function(error, records){  
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

      //TRADE SERVER ROUTES
      //>>> posts trade
      apiRouter.post('/trades', function(request, response) {
      let trade = new Trade(request.body) 
      trade.save(function(error) { 
          if(error) {
              response.send(error)
          }
          else {
              response.json(trade)
            }
          })
        })

       apiRouter.put('/trades/:_id', function(request,response){
       Trade.findByIdAndUpdate(request.params._id, request.body, function(error, records){
        if(error) {
            response.send(error)
        }
        else {
            response.json(records)
        }
    })

})
      //>>> gets all trades 
      apiRouter.get('/trades', function(request, response) {
        console.log(request.query)
        Trade.find(request.query, function(error, records){  
          if(error) {
              response.status(500).send(error)
          }
          else {
              response.json(records)
            }
        })
      })
       //>>> gets a single trade with unique _id  
       apiRouter.get('/trades/:tradeId', function(request, response) {
        Vinyl.findById(request.params.tradeId, function(error, records){  
           if(error) {
              response.send(error)
           }
           else {
               response.json(records)
             }
           })
         })
      //>>> gets trades associated with current user logged in
      apiRouter.get('user/trades', function(request, response) {
        Trade.find({traderId: request.user._id}, function(error, records) { 
          if(error) {
              response.send(error)
          }
          else {
              response.json(records)
            }
          })
        })

      apiRouter.delete('/trades/:_id', function(req, res){
      Trade.remove({ _id: req.params._id}, (err) => {
        if(err) return res.json(err)
        res.json({
          msg: `record ${req.params._id} successfully deleted`,
          _id: req.params._id
        })
      })  
    })

module.exports = apiRouter