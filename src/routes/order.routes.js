import express from 'express'
import {createOrder, getOrderByUser, changeOrderStatus, getAllOrders} from '../controllers/order.controller.js'
import { authenticate, authorizeAdmin } from '../middlewares/jwtauth.js'

const router = express.Router()

router.post('/', authenticate, createOrder)
router.get('/:id', authenticate, getOrderByUser)
router.get('/', authenticate, authorizeAdmin, getAllOrders)
router.patch('/:id', authenticate, authorizeAdmin, changeOrderStatus)

export default router