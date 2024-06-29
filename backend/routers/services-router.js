import express from 'express'
const sercicesRouter =express.Router()
import { ServicesController } from '../controllers/Services.controller.js'

sercicesRouter.route('/services').get(ServicesController)

export {sercicesRouter}