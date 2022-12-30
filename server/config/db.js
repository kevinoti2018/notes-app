const mongoose = require('mongoose')

const connectDB = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI,{
            useUnifiedTopology:true,
            useNewUrlParser: true,
          
        })
        
        console.log(`connected: ${conn.connection.host}`);
    }
    catch(err){
        console.error(`Error: ${err.message}`)
        process.exit()
    }
}
module.exports =connectDB