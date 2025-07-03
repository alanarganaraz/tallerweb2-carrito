import express from 'express'
import {createOrder, getOrderByUser, changeOrderStatus, getAllOrders, getAllOrdersByUser} from '../controllers/order.controller.js'
import { authenticate, authorizeAdmin } from '../middlewares/jwtauth.js'

const router = express.Router()

router.post('/', authenticate, createOrder)
router.get('/', authenticate, getAllOrders)
router.get('/:id', authenticate, getOrderByUser)
router.patch('/:id', authenticate, authorizeAdmin, changeOrderStatus)

export default router