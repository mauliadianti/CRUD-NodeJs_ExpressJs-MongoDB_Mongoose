const express = require('express')
const router = express.Router()

const Data = require('./data')
const dataConfig = new Data()

const routes = (app) =>{
  router.post('/postData', dataConfig.postSmth)
  router.post('/postBulk', dataConfig.bulkPost)
  router.get('/readData', dataConfig.readSmth)
  router.get('/readData/:id', dataConfig.readbyId)
  router.patch('/update/:id', dataConfig.updateSmth)
  router.delete('/delete/:id', dataConfig.deleteOne)
  router.delete('/delete', dataConfig.deleteAll)



  app.use(router)

  app.use(function (req, res){
    res.status(404);
    if(req.accepts('json')){
      res.send({"status": 404 , error: 'Not Found'});
      return;
    }
  })
}

module.exports = routes 