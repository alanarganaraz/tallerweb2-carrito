import express from 'express'
import {createOrder, getOrderByUser} from '../controllers/order.controller.js'
import { authenticate } from '../middlewares/jwtauth.js'

const router = express.Router()

router.post('/', authenticate, createOrder)
router.get('/:id', authenticate, getOrderByUser)

export default router