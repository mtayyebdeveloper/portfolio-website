import {getAllPostsController,getPostController} from '../controllers/posts.controller.js'
import express from 'express'

const getallpostsRouter =express.Router()

getallpostsRouter.route('/posts').get(getAllPostsController)
getallpostsRouter.route("/posts/full-posts/:id").get(getPostController)

export {getallpostsRouter}