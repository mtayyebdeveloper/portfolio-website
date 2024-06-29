import mongoose from "mongoose";

const mongoDBconnection =async ()=>{
    try {
        await mongoose.connect(process.env.DB_URL);
        return console.log("Database connected successfully.......");
    } catch (error) {
       return console.log("Database connection error:",error);
    }
}

export default mongoDBconnection