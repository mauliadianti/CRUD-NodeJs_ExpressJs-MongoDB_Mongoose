const express = require('express'); 
const morgan = require('morgan');
const cors = require('cors')
const app = express();
const port = 3000; 

const mongoose = require('mongoose');
const db = require('./src/config/db').mongoURI


const routes = require('./src/api/routes')

//connect database
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=> console.log('connected to mongodb')).catch(err => console.log(err))


//middleware 
app.use(
  express.json(), 
  morgan('dev'), 
  cors()
)


//running server
app.listen(port, ()=> {
  console.log(`server running in http:127.0.0.1:${port}`)
})


routes(app)