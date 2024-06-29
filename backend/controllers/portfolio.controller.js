import {Portfolio} from '../models/portfolio.model.js'

const getAllPortfolio =async(req,res)=>{
    try {
        const allData =await Portfolio.find();
        if(!allData){
            return res.status(401).json("projects not found...")
        }
        return res.status(200).json(allData)
    } catch (error) {
        return res.status(401).json({"portfolio projects error: ":error})
    }
}

export {getAllPortfolio}