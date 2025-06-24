import express from 'express'
import { register, login } from '../controllers/auth.controller.js'
import { apiKeyMiddleware } from '../middlewares/apikey.js'

const router = express.Router()

router.post('/register', apiKeyMiddleware, register)
router.post('/login', login)

export default router
