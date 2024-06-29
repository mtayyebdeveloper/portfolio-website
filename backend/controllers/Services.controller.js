import {Service} from '../models/services.model.js'
const ServicesController =async (req,res)=>{
    try {
        const services=await Service.find({})
        if(!services){
            return res.status(404).json({massage:"No services found"})
        }
        return res.status(200).json(services)
    } catch (error) {
        return res.status(500).json({massage:"Internal server error"})
    }
}

export {ServicesController}