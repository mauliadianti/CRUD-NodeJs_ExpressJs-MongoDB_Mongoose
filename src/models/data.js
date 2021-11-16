const mongoose = require('mongoose')

const DataMhs = mongoose.Schema({
  nama:{
    type: String, 
    required : true, 
  }, 
  kota: {
    type: String, 
    required : true
  }, 
  insertedAt:{
    type: String, 
    required : false
  }, 
  updatedAt: {
    type: String, 
    required: false
  }
})


module.exports = mongoose.model('dataKontak', DataMhs)
