import express from 'express'
import { register, login } from '../controllers/auth.controller.js'
import { apiKeyMiddleware } from '../middlewares/apikey.js'

const router = express.Router()

// CREAR UN MIDDLEWARE PARA LAS VALIDACIONES DEL ROUTE REGISTER, PARA NO METER MIERDA.

router.post('/register', apiKeyMiddleware, register)
router.post('/login', login)

export default router
