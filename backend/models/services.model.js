import mongoose from 'mongoose'

const servicesSchema =new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
},{timestamps:true})

export const Service =mongoose.model("Service",servicesSchema)