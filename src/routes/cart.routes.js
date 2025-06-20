import express from 'express'
import { addProductToCart, getCartById } from '../controllers/cart.controller.js'
import { authenticate } from '../middlewares/jwtauth.js'

const router = express.Router()

router.post('/', authenticate, addProductToCart)
router.get('/', authenticate, getCartById)
// endpoint para eliminar todo del carrito


export default router
