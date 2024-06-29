import express from 'express'
import {getAllPortfolio} from '../controllers/portfolio.controller.js'

const portfolioRouter =express.Router()

portfolioRouter.route("/portfolio").get(getAllPortfolio)

export {portfolioRouter}