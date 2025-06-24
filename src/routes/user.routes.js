import express from 'express'
import { getUserData } from '../controllers/user.controller.js'
import { authenticate } from '../middlewares/jwtauth.js'

const router = express.Router()

router.get('/', authenticate, getUserData)

export default router
