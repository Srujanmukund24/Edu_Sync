const mongoose = require("mongoose")

const connectDB = async() => {

    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB Connected: ${mongoose.connection.host}`)
    } catch (error){
        console.log(`mongo db Error ${error}`)
    }
}

module.exports = connectDB