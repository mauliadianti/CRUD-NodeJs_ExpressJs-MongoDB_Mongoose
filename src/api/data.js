const { insertMany } = require('../models/data')
const dataKontak = require('../models/data')

const webToken = "7thd9eh"

function Token(req){
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if(webToken === token) return 1 
  else return 0
}


class Data{
  //CREATE
  async postSmth(req, res){
    try{
      if(Token(req)){
        let today = new Date();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date+' '+time;

        const postData = new dataKontak({
          nama: req.body.nama, 
          kota: req.body.kota, 
          insertedAt: dateTime
        })
        const result = await postData.save()
        res.status(200).send({message: result})
      }else{
        res.status(401).send({"status": 401, error: 'unauthorize'})
      }
    }catch(err){
      res.status(500).send({error: 'server error ' + err})
    }
  }

  //READ
  async readSmth(req, res){
    try{
      if(Token(req)){
        const result = await dataKontak.find()
        res.status(200).send({message: result})
      }else{
        res.status(401).send({"status": 401, error: 'unauthorize'})
      }
    }catch(err){
      res.status(500).send({error: 'server error ' + err})
    }
  }

  async readbyId(req, res){
    try{
      if(Token(req)){
        const result = await dataKontak.findOne({_id: req.params.id})
        res.status(200).send({message: result})
      }else{
        res.status(401).send({'status' : 401, error: 'unauthorize'})
      }
    }catch(err){
      res.status(500).send({error: 'server error '+ err})
    }
  }

  //UPDATE
  async updateSmth(req, res){
    try{
      if(Token(req)){
        let today = new Date();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date+' '+time;

        const valueUpdated = req.body
        for(const key in valueUpdated){
          const result = await dataKontak.updateOne({_id: req.params.id}, {
            [`${key}`] : `${valueUpdated[key]}`
            , updatedAt: dateTime})
          res.status(200).send({message: await dataKontak.findById({_id: req.params.id})})
        }
      }else{
        res.status(401).send({'status': 401, error: 'unauthorize'})
      }
    }catch(err){
      res.status(500).send({error: 'server error '+ err})
    }
  }



  //DELETE
  async deleteOne(req, res){
    try{
      if(Token(req)){
        const result = await dataKontak.deleteOne({_id: req.params.id})
        if(!result.deletedCount){
          res.status(500).send({message: `no user with id ${req.params.id}`})
        }else{
          res.status(200).send({message: `user with id: ${req.params.id} deleted`})
        }
      }else{
        res.status(401).send({error: 'unauthorize'})
      }
    }catch(err){
      res.status(500).send({error: 'server error ' + err})
    }
  }


  //BULK DELETE
  async deleteAll(req, res){
    try{
      if(Token(req)){
        const result = await dataKontak.deleteMany()
        if(!result.deletedCount){
            res.status(500).send({error: 'no data available, insert one'})
        }else{
          res.status(200).send({message: 'all documents deleted'})
        }
      }else{
        res.status(401).send({error: 'unauthorize'})
      }
    }catch(err){
      res.status(500).send({error: 'server error ' + err})
    }
  }


  //BULK INSERT 
  bulkPost(req, res){
    try{
      if(Token(req)){
          let today = new Date();
          let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
          let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
          let dateTime = date+' '+time;

          const bulk1 = req.body
          bulk1.forEach(async element => { 
            Object.assign(element, {insertedAt: dateTime})
            const result = await dataKontak.insertMany(element)
          });
          res.status(200).send({message: 'OK'})
      }else{
        res.status(401).send({error: 'unauthorize'})
      }
    }catch(err){  
      res.status(500).send({error: 'server error ' + err})
    }
  }

  //BULK UPDATED
  


}

module.exports = Data