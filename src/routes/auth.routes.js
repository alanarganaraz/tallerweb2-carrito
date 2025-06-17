import express from 'express'
import { register, login } from '../controllers/auth.controller.js'

const router = express.Router()

// CREAR UN MIDDLEWARE PARA LAS VALIDACIONES DEL ROUTE REGISTER, PARA NO METER MIERDA.

router.post('/register', register)
router.post('/login', login)

export default router
