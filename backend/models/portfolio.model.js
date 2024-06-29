import mongoose from 'mongoose'

const portfolioSchema =new mongoose.Schema({
    type:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    }
},{timestamps:true})

export const Portfolio =mongoose.model("Portfolio",portfolioSchema)