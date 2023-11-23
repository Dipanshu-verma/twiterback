const mongoose = require("mongoose")
const dotenv=  require("dotenv")

dotenv.config();

const USERNAME =  process.env.DB_USERNAME;

const PASSWORD =  process.env.DB_PASSWORD;

 
 const connection =  mongoose.connect(`mongodb://${USERNAME}:${PASSWORD}@ac-dyxtfcd-shard-00-00.mbiyul4.mongodb.net:27017,ac-dyxtfcd-shard-00-01.mbiyul4.mongodb.net:27017,ac-dyxtfcd-shard-00-02.mbiyul4.mongodb.net:27017/?ssl=true&replicaSet=atlas-sixufj-shard-0&authSource=admin&retryWrites=true&w=majority`)

 module.exports={connection}
 
