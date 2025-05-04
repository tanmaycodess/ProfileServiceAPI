import mongoose from "mongoose";

const MongoDBConnection = async () => {
    try{

        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`connected to mongoDB ${conn.connection.host}`)

    } catch(e) {
        console.log('error connecting to mongoDb' , e.message)
        process.exit(1);
    }
}

export default MongoDBConnection